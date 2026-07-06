import React, { useState, useEffect } from 'react';
import VennDiagram from './components/visualizers/VennDiagram';
import NumberLine from './components/visualizers/NumberLine';
import DivisibilitySieve from './components/visualizers/DivisibilitySieve';
import SymmetryLab from './components/visualizers/SymmetryLab';

export default function App() {
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GitHub & Email Config States
  const [token, setToken] = useState('');
  const [repo, setRepo] = useState('chuductu-ui/toan6-cun');
  const [keyDad, setKeyDad] = useState('');
  const [keyMom, setKeyMom] = useState('');
  const [githubConnected, setGithubConnected] = useState(false);
  const [sha, setSha] = useState(null);

  // Study Progress
  // Structure: { visitedTheory: { lessonId: ISOString }, visitedExercises: { lessonId: ISOString }, completed: { lessonId: ISOString } }
  const [progress, setProgress] = useState({ visitedTheory: {}, visitedExercises: {}, completed: {} });

  // App UI Navigation
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('theory'); // 'theory' or 'exercises'
  const [showSettings, setShowSettings] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showCelebrate, setShowCelebrate] = useState(false);

  // Student Answers Work State
  // { mc: { q_idx: selected_val }, written: { ex_idx: text } }
  const [answers, setAnswers] = useState({ mc: {}, written: {} });

  // 1. Initial Load: Parse credentials from URL Hash (Secure, bookmarkable, bypasses localStorage)
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.substring(1);
      if (!hash) return;
      const params = new URLSearchParams(hash);
      const hashToken = params.get('token') || '';
      const hashRepo = params.get('repo') || 'chuductu-ui/toan6-cun';
      const hashDad = params.get('keyDad') || '';
      const hashMom = params.get('keyMom') || '';

      if (hashToken) setToken(hashToken);
      if (hashRepo) setRepo(hashRepo);
      if (hashDad) setKeyDad(hashDad);
      if (hashMom) setKeyMom(hashMom);
    };

    parseHash();

    // Fetch Curriculum
    fetch('lessons_v2.json')
      .then(res => {
        if (!res.ok) throw new Error('Không thể tải giáo trình học.');
        return res.json();
      })
      .then(data => {
        setCurriculum(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 2. Load Progress from GitHub when credentials change or connect is clicked
  useEffect(() => {
    if (token && repo) {
      connectAndSync();
    }
  }, [token, repo]);

  const connectAndSync = async (customToken = token, customRepo = repo) => {
    if (!customToken || !customRepo) return;
    setLoading(true);
    try {
      const url = `https://api.github.com/repos/${customRepo}/contents/progress.json`;
      const res = await fetch(url, {
        headers: {
          Authorization: `token ${customToken}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        const content = decodeURIComponent(escape(atob(data.content)));
        const parsedProgress = JSON.parse(content);
        setProgress(parsedProgress);
        setSha(data.sha);
        setGithubConnected(true);
      } else if (res.status === 404) {
        // First time initialization
        setProgress({ visitedTheory: {}, visitedExercises: {}, completed: {} });
        setSha(null);
        setGithubConnected(true);
      } else {
        throw new Error('Kết nối GitHub thất bại. Vui lòng kiểm tra lại Token.');
      }
    } catch (err) {
      console.error(err);
      alert('⚠️ Không thể đồng bộ với GitHub: ' + err.message);
      setGithubConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    // Save to Hash for bookmarking
    const params = new URLSearchParams();
    params.set('token', token);
    params.set('repo', repo);
    params.set('keyDad', keyDad);
    params.set('keyMom', keyMom);
    window.location.hash = params.toString();

    connectAndSync(token, repo);
    setShowSettings(false);
  };

  // Helper: Save progress file to GitHub
  const saveProgressToGitHub = async (updatedProgress) => {
    if (!token || !repo || !githubConnected) return;

    const url = `https://api.github.com/repos/${repo}/contents/progress.json`;
    let latestSha = sha;

    // Get current SHA to avoid conflicts
    const getRes = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });
    if (getRes.ok) {
      const data = await getRes.json();
      latestSha = data.sha;
    }

    const content = btoa(unescape(encodeURIComponent(JSON.stringify(updatedProgress, null, 2))));
    const putRes = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: 'Cập nhật tiến độ học tập của Cún 🦉',
        content: content,
        sha: latestSha || undefined,
        branch: 'main'
      })
    });

    if (putRes.ok) {
      const putData = await putRes.json();
      setSha(putData.content.sha);
    }
  };

  // Select a lesson & update Visited Theory
  const handleSelectLesson = async (lesson) => {
    setSelectedLesson(lesson);
    setActiveTab('theory');
    setAnswers({ mc: {}, written: {} }); // reset answer pads

    const now = new Date().toISOString();
    const updatedProgress = {
      ...progress,
      visitedTheory: {
        ...(progress.visitedTheory || {}),
        [lesson.id]: now
      }
    };
    setProgress(updatedProgress);

    if (githubConnected) {
      try {
        await saveProgressToGitHub(updatedProgress);
      } catch (err) {
        console.error('Failed to save theory visit to GitHub:', err);
      }
    }
  };

  // Switch tabs & update Visited Exercises
  const handleTabChange = async (tab) => {
    setActiveTab(tab);
    if (tab === 'exercises' && selectedLesson) {
      const now = new Date().toISOString();
      const updatedProgress = {
        ...progress,
        visitedExercises: {
          ...(progress.visitedExercises || {}),
          [selectedLesson.id]: now
        }
      };
      setProgress(updatedProgress);

      if (githubConnected) {
        try {
          await saveProgressToGitHub(updatedProgress);
        } catch (err) {
          console.error('Failed to save exercise visit to GitHub:', err);
        }
      }
    }
  };

  // Student MCQ Option Select
  const handleSelectOption = (qIdx, optVal) => {
    setAnswers(prev => ({
      ...prev,
      mc: { ...prev.mc, [qIdx]: optVal }
    }));
  };

  // Student Written Answer Input
  const handleWrittenChange = (exIdx, text) => {
    setAnswers(prev => ({
      ...prev,
      written: { ...prev.written, [exIdx]: text }
    }));
  };

  // Submit Completed Lesson Work
  const handleSubmitWork = async () => {
    if (!selectedLesson) return;
    if (!githubConnected) {
      alert('⚠️ Vui lòng cấu hình kết nối GitHub trong mục Cài đặt trước khi nộp bài.');
      setShowSettings(true);
      return;
    }

    setSubmitting(true);

    const submissionTime = new Date().toISOString();
    
    // Format package for GitHub & Email
    const submissionData = {
      lessonId: selectedLesson.id,
      lessonTitle: selectedLesson.title,
      studentName: 'Cún',
      submittedAt: submissionTime,
      multipleChoiceAnswers: selectedLesson.mc_questions.map((q, idx) => ({
        questionNum: idx + 1,
        question: q.question,
        selectedOption: answers.mc[idx] || 'Chưa làm',
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      })),
      writtenAnswers: selectedLesson.practice_exercises.map((ex, idx) => ({
        exerciseNum: idx + 1,
        problem: ex.prob,
        studentAnswer: answers.written[idx] || '',
        solution: ex.sol
      }))
    };

    try {
      // 1. Write submission JSON file to GitHub
      const timestampStr = submissionTime.replace(/[:.]/g, '-');
      const filename = `submissions/submission_${selectedLesson.id}_${timestampStr}.json`;
      const url = `https://api.github.com/repos/${repo}/contents/${filename}`;
      const contentBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(submissionData, null, 2))));

      await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: `Nộp bài tập: ${selectedLesson.title} - Học sinh Cún 🚀`,
          content: contentBase64,
          branch: 'main'
        })
      });

      // 2. Dispatch Emails to Parents via Web3Forms (CC-like logic using two parallel calls)
      let emailText = `BÀI LÀM MÔN TOÁN LỚP 6 - CỦN\n`;
      emailText += `Bài học: ${selectedLesson.title}\n`;
      emailText += `Thời gian nộp: ${new Date(submissionTime).toLocaleString('vi-VN')}\n\n`;
      
      emailText += `--- PHẦN 1: CÂU HỎI TRẮC NGHIỆM ---\n`;
      submissionData.multipleChoiceAnswers.forEach((ans, idx) => {
        emailText += `Câu ${idx + 1}: ${ans.question}\n`;
        emailText += `  - Câu trả lời của con: ${ans.selectedOption}\n`;
        emailText += `  - Đáp án chuẩn: ${ans.correctAnswer}\n`;
        emailText += `  - Hướng dẫn giải: ${ans.explanation}\n\n`;
      });
      
      emailText += `--- PHẦN 2: BÀI TẬP TỰ LUẬN ---\n`;
      submissionData.writtenAnswers.forEach((ans, idx) => {
        emailText += `Bài tập ${idx + 1}: ${ans.problem}\n`;
        emailText += `  - Bài làm của con:\n${ans.studentAnswer || 'Trống'}\n`;
        emailText += `  - Lời giải mẫu:\n${ans.solution}\n\n`;
      });

      const sendEmail = async (accessKey) => {
        if (!accessKey) return;
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `[Toán Lớp 6] Bài làm của Cún: ${selectedLesson.title}`,
            from_name: 'owl-math-app',
            message: emailText
          })
        });
      };

      await Promise.all([sendEmail(keyDad), sendEmail(keyMom)]);

      // 3. Mark lesson completed and save progress
      const updatedProgress = {
        ...progress,
        completed: {
          ...(progress.completed || {}),
          [selectedLesson.id]: submissionTime
        }
      };
      setProgress(updatedProgress);
      await saveProgressToGitHub(updatedProgress);

      // Show success modal
      setShowCelebrate(true);
    } catch (err) {
      console.error(err);
      alert('❌ Có lỗi xảy ra trong lúc nộp bài: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Helper: Format date for tags
  const formatTimeTag = (isoStr) => {
    if (!isoStr) return '';
    const date = new Date(isoStr);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  // Render Visualizer Components
  const renderVisualizer = (type, config) => {
    if (type === 'VennDiagram') return <VennDiagram config={config} />;
    if (type === 'NumberLine') return <NumberLine />;
    if (type === 'DivisibilitySieve') return <DivisibilitySieve />;
    if (type === 'SymmetryLab') return <SymmetryLab />;
    return null;
  };

  if (error) {
    return (
      <div className="loading-overlay">
        <h2>⚠️ Có lỗi xảy ra</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-left" style={{ cursor: 'pointer' }} onClick={() => setSelectedLesson(null)}>
          <span className="logo-emoji">🦉</span>
          <div>
            <h1 className="app-title">Toán Lớp 6 Thú Vị</h1>
            <p className="student-name">Học sinh: <strong>Cún</strong></p>
          </div>
        </div>

        <div className="header-right">
          {githubConnected ? (
            <div className="sync-status connected">🟢 Đang đồng bộ GitHub</div>
          ) : (
            <div className="sync-status disconnected">🔴 Chưa kết nối GitHub</div>
          )}
          <button className="btn-action btn-settings" onClick={() => setShowSettings(true)}>
            ⚙️ Cài đặt đồng bộ
          </button>
        </div>
      </header>

      {/* Main Panel */}
      <main className="app-main">
        
        {/* Left Side: Lesson List */}
        <aside className="curriculum-sidebar">
          <div className="sidebar-header">
            <h2>Bài học & Ôn tập</h2>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {curriculum?.chapters.map((chapter, chIdx) => (
              <div key={chIdx} className="chapter-group">
                <div className="chapter-header">{chapter.title}</div>
                <ul className="lesson-list">
                  {chapter.lessons.map((lesson) => {
                    const isCompleted = progress.completed && progress.completed[lesson.id];
                    const isVisitedTheory = progress.visitedTheory && progress.visitedTheory[lesson.id];
                    const isVisitedExs = progress.visitedExercises && progress.visitedExercises[lesson.id];
                    
                    return (
                      <li
                        key={lesson.id}
                        className={`lesson-item ${selectedLesson?.id === lesson.id ? 'active' : ''} ${isCompleted ? 'dim-completed' : ''}`}
                        onClick={() => handleSelectLesson(lesson)}
                      >
                        <div className="lesson-item-title">{lesson.title}</div>
                        <div className="lesson-item-desc">{lesson.description}</div>
                        
                        <div className="lesson-tags">
                          {isCompleted ? (
                            <span className="status-tag completed">
                              ✓ Đã nộp bài: {formatTimeTag(progress.completed[lesson.id])}
                            </span>
                          ) : (
                            <>
                              {isVisitedTheory ? (
                                <span className="status-tag visited">
                                  📖 Đang học: {formatTimeTag(progress.visitedTheory[lesson.id])}
                                </span>
                              ) : (
                                <span className="status-tag unopened">📖 Chưa đọc lý thuyết</span>
                              )}

                              {isVisitedExs && (
                                <span className="status-tag visited" style={{ backgroundColor: '#fed7aa', color: '#ea580c' }}>
                                  ✍️ Đang làm bài
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Side: Active Workspace */}
        <section className="content-workspace">
          {selectedLesson ? (
            <div className="lesson-workspace">
              {/* Header Title Card */}
              <div className="lesson-title-card">
                <h2>{selectedLesson.title}</h2>
                <p>{selectedLesson.description}</p>
              </div>

              {/* Work Tabs */}
              <div className="workspace-tabs">
                <button
                  className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
                  onClick={() => handleTabChange('theory')}
                >
                  📖 Phần 1: Học Lý Thuyết
                </button>
                <button
                  className={`tab-btn ${activeTab === 'exercises' ? 'active' : ''}`}
                  onClick={() => handleTabChange('exercises')}
                >
                  ✍️ Phần 2: Làm Bài Tập
                </button>
              </div>

              {/* Tab Content Panels */}
              {activeTab === 'theory' ? (
                <div className="tab-content">
                  <div className="theory-text">{selectedLesson.theory.explanation}</div>

                  {/* Diagrams */}
                  {selectedLesson.theory.diagram && (
                    <div className="theory-diagram-container">
                      <img
                        src={`images/${selectedLesson.theory.diagram}`}
                        className="theory-diagram"
                        alt={selectedLesson.title}
                      />
                      <div className="theory-diagram-caption">Hình minh họa: {selectedLesson.title}</div>
                    </div>
                  )}

                  {/* Callout Boxes */}
                  {selectedLesson.theory.callout && (
                    <div className="callout-card">
                      <div className="callout-title">★ THỰC TẾ QUANH EM</div>
                      <div className="callout-body">{selectedLesson.theory.callout}</div>
                    </div>
                  )}

                  {/* Interactive Lab */}
                  {selectedLesson.theory.visualizerType && (
                    <div className="interactive-lab">
                      <h3>🔬 Phòng thí nghiệm tương tác</h3>
                      {renderVisualizer(selectedLesson.theory.visualizerType, selectedLesson.theory.visualizerConfig)}
                    </div>
                  )}

                  <div className="theory-footer">
                    <button className="btn-action" onClick={() => handleTabChange('exercises')}>
                      Con đã đọc xong! Làm bài tập thôi ➔
                    </button>
                  </div>
                </div>
              ) : (
                <div className="tab-content">
                  
                  {/* Multiple Choice Section */}
                  <div className="exercise-section-title">A. Câu hỏi trắc nghiệm ôn tập (10 câu)</div>
                  <div className="mcq-list">
                    {selectedLesson.mc_questions.map((q, idx) => (
                      <div key={idx} className="mcq-card">
                        <div className="mcq-question">{`Câu ${idx + 1}: ${q.question}`}</div>
                        <div className="mcq-options">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = answers.mc[idx] === opt;
                            return (
                              <button
                                key={optIdx}
                                className={`option-btn ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleSelectOption(idx, opt)}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Written Practice Section */}
                  <div className="exercise-section-title">B. Bài tập tự luận luyện kỹ năng (10 bài)</div>
                  <div className="written-list">
                    {selectedLesson.practice_exercises.map((ex, idx) => (
                      <div key={idx} className="written-card">
                        <div className="written-problem">{`Bài tập ${idx + 1}: ${ex.prob}`}</div>
                        <textarea
                          className="written-textarea"
                          placeholder="Con hãy viết bài giải hoặc nháp câu trả lời vào đây nhé..."
                          value={answers.written[idx] || ''}
                          onChange={(e) => handleWrittenChange(idx, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Submit Actions */}
                  <div className="submit-actions">
                    <button
                      className="btn-submit-large"
                      onClick={handleSubmitWork}
                      disabled={submitting}
                    >
                      {submitting ? '⏳ Đang nộp bài...' : 'Nộp bài cho Bố Mẹ 🚀'}
                    </button>
                    {!githubConnected && (
                      <div className="submit-warning">
                        ⚠️ Bạn cần kết nối GitHub trong mục Cài đặt để nộp bài làm.
                      </div>
                    )}
                  </div>

                </div>
              )}
            </div>
          ) : (
            // Welcome Screen
            <div className="welcome-board">
              <div className="welcome-owl">🦉</div>
              <h2>Chào mừng Cún đến với Toán Lớp 6!</h2>
              <p>Con hãy chọn một bài học ở cột bên trái để bắt đầu khám phá lý thuyết thú vị và làm bài tập nhé! Cố lên con gái yêu! 💪❤️</p>
              
              {!githubConnected && (
                <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 'bold' }}>
                  ⚠️ Chưa kết nối với GitHub. Vui lòng nhờ Bố Mẹ bấm vào nút "Cài đặt đồng bộ" ở góc trên bên phải để thiết lập trước khi làm bài tập nhé.
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Settings Setup Modal */}
      {showSettings && (
        <div className="overlay">
          <form className="modal-content" onSubmit={handleSaveSettings}>
            <div className="modal-header">
              <h3>⚙️ Cài đặt đồng bộ GitHub & Email</h3>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">GitHub Personal Access Token (PAT):</label>
                <input
                  type="password"
                  className="form-input"
                  required
                  placeholder="ghp_..."
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
                <span className="form-help">Token có quyền ghi vào Repo của bạn để lưu file bài làm.</span>
              </div>

              <div className="form-group">
                <label className="form-label">GitHub Repository Path:</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="chuductu-ui/toan6-cun"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Web3Forms Access Key (Bố Tú):</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nhập khóa Web3Forms của Bố"
                  value={keyDad}
                  onChange={(e) => setKeyDad(e.target.value)}
                />
                <span className="form-help">Liên kết gửi bài làm đến chu.duc.tu@gmail.com</span>
              </div>

              <div className="form-group">
                <label className="form-label">Web3Forms Access Key (Mẹ Hà):</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nhập khóa Web3Forms của Mẹ"
                  value={keyMom}
                  onChange={(e) => setKeyMom(e.target.value)}
                />
                <span className="form-help">Liên kết gửi bài làm đến thanhha.phth@gmail.com</span>
              </div>
            </div>
            
            <div className="modal-footer">
              <button type="button" className="btn-action btn-reset" onClick={() => setShowSettings(false)}>
                Hủy
              </button>
              <button type="submit" className="btn-action">
                💾 Lưu & Đồng bộ
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Celebrate Success Modal */}
      {showCelebrate && (
        <div className="overlay" onClick={() => setShowCelebrate(false)}>
          <div className="modal-content celebrate-card" onClick={(e) => e.stopPropagation()}>
            <div className="celebrate-emoji">🎉🏆</div>
            <h3>Nộp bài thành công!</h3>
            <p>Con giỏi lắm! Bài làm của con đã được gửi đến email của Bố Mẹ để chấm rồi nhé.</p>
            <p>Con có thể chuyển sang học bài tiếp theo rồi đấy! 🥰</p>
            <button className="btn-action" onClick={() => setShowCelebrate(false)}>
              Tuyệt vời, con cảm ơn!
            </button>
          </div>
        </div>
      )}

      {/* Syncing Overlay Screen */}
      {loading && (
        <div className="overlay loading-overlay">
          <div className="spinner"></div>
          <div>Đang tải dữ liệu học tập và đồng bộ...</div>
        </div>
      )}
    </div>
  );
}
