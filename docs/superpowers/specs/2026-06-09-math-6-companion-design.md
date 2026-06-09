# Spec: Math 6 Interactive Learning Companion (Toán 6 Phiêu Lưu Ký)

An interactive, gamified static web application designed to help Grade 6 students (like Cún) master the standard Vietnamese Math 6 Volume 1 (Ket Noi Tri Thuc) textbook curriculum through interactive visual definitions and multi-level quizzes.

---

## 1. Technical Architecture & Tech Stack

*   **Architecture**: Single Page Application (SPA), completely client-side, hosted for free on **GitHub Pages**.
*   **Framework**: **React + Vite** for modular UI development and rich state management.
*   **Styling**: Vanilla CSS (CSS variables, modern grid/flex layouts, animations, glassmorphism card theme).
*   **Interactivity**: Canvas API / SVG for custom interactive visualizer graphs (Venn diagrams, geometry tools, number lines).
*   **Deployment & Hosting**: GitHub Pages. Auto-deploys via a simple GitHub Action when modifications are pushed to the repository.
*   **Content Model**: The entire curriculum (lessons, theory explanations, exercise levels, questions, correct answers) is stored in a structured JSON file (`public/lessons.json`). This allows the parent to easily edit lessons and questions directly on GitHub without modifying application code.

---

## 2. Gamified User Flow

1.  **Main Quest Map (Duolingo Style)**:
    *   A vertical path of circular lesson nodes representing the lessons in the textbook.
    *   Completed lessons show a gold crown and stars ($\star \star \star$).
    *   The active lesson node pulses to invite the student. Subsequent lesson nodes are locked ($\text{🔒}$).
    *   Header tracks: **Health Hearts ($5/5$)**, **Accumulated Stars**, and a **"Lịch sử học" (Learning History)** button.
2.  **Lesson Drawer / Selection**:
    *   Clicking a lesson node opens a detailed card with:
        *   **Part 1: Học lý thuyết (Theory)**: Launches the interactive visualization sandbox.
        *   **Part 2: Luyện tập (Exercises)**: Divided into **Dễ (Easy)**, **Trung bình (Medium)**, and **Khó (Hard)** levels.
        *   Levels must be completed sequentially (Easy $\rightarrow$ Medium $\rightarrow$ Hard). Completing a level requires scoring at least 80% ($8/10$).
3.  **Hearts & Review Loop**:
    *   Students start with 5 hearts. Every incorrect answer deducts 1 heart.
    *   If hearts reach 0, Cún is prompted to review the interactive Theory section again, which automatically restores 2 hearts, encouraging understanding over random guessing.

---

## 3. Curriculum Schema (`lessons.json`)

The curriculum config structure defines both explanations and exercises. Example structure:

```json
{
  "chapters": [
    {
      "id": "chapter-1",
      "title": "Chương I: Tập hợp các số tự nhiên",
      "lessons": [
        {
          "id": "bai-1-tap-hop",
          "title": "Bài 1: Tập hợp",
          "description": "Làm quen với tập hợp, phần tử và ký hiệu thuộc/không thuộc.",
          "theory": {
            "explanation": "Tập hợp giống như một nhóm các đồ vật, con vật hoặc con số. Ví dụ, tập hợp các số lẻ nhỏ hơn 10 gồm các số 1, 3, 5, 7, 9. Mỗi số này được gọi là một phần tử.",
            "visualizerType": "VennDiagram",
            "visualizerConfig": {
              "setA": {
                "name": "Tập A: Số lẻ < 10",
                "elements": [1, 3, 5, 7, 9]
              },
              "setB": {
                "name": "Tập B: Số nguyên tố < 10",
                "elements": [2, 3, 5, 7]
              }
            }
          },
          "exercises": {
            "easy": [
              {
                "id": "q1",
                "type": "multiple-choice",
                "question": "Cho tập hợp M = {a, b, c}. Phần tử nào sau đây thuộc tập hợp M?",
                "options": ["a", "d", "e", "f"],
                "correctAnswer": "a",
                "explanation": "Chữ cái 'a' nằm trong dấu ngoặc nhọn của tập hợp M nên 'a' thuộc M."
              }
            ],
            "medium": [],
            "hard": []
          }
        }
      ]
    }
  ]
}
```

---

## 4. Interactive Visualizers (Part 1)

Four modular canvas/SVG-based components will handle textbook definitions:

1.  **VennDiagram Visualizer**: Displays two overlapping circles. Cún drags number badges from a pool and drops them into:
    *   Set A only (e.g., odd numbers that are composite).
    *   Set B only (e.g., even prime numbers).
    *   Set A & B intersection (odd prime numbers).
    *   Outside both.
    *   *Interactivity*: Dropping items gives real-time visual alignment. A "Kiểm tra" (Verify) button provides instant feedback.
2.  **NumberLine Visualizer**: Shows a horizontal scale. Used to visualize:
    *   Inequalities ($a < b$).
    *   Integer addition and subtraction. Dragging an arrow right represents $+$, dragging left represents $-$.
3.  **DivisibilitySieve**: Shows a grid of numbers 1 to 100.
    *   Cún taps on number selectors (e.g., 2, 3, 5, 9).
    *   The visualizer colors all multiples of that number on the board, showing patterns (e.g., multiples of 5 always end in 0 or 5; multiples of 2 are even).
4.  **SymmetryLab**: A grid board with standard 2D shapes (square, rectangle, triangle, hexagon).
    *   Cún can drag an interactive dotted line (Axis of Symmetry) to see if the shape folds perfectly onto itself.
    *   Cún can rotate the shape around a pivot point to see rotational symmetry.

---

## 5. Local Archiving & Zalo Sharing

*   **localStorage Database (`math6_companion_history`)**:
    *   Appends completion records client-side on PC/iPad.
    *   Fields saved: `timestamp` (date), `lessonId`, `lessonTitle`, `level` (easy/medium/hard), `score` (e.g., 9/10), `timeTaken` (seconds), and `incorrectQuestions` (array of question objects).
    *   **Lịch sử học Modal**: Displays all attempts grouped by lesson and sorted chronologically, highlighting lessons that need review.
*   **Zalo Share Mechanism**:
    *   On level completion, a modal displays the score and an **"Gửi kết quả qua Zalo"** button.
    *   Clicking the button copies the formatted message to the clipboard and redirects the user to Zalo Web or App (`https://zalo.me/`).
    *   *Message Format*:
        ```text
        📐 KẾT QUẢ HỌC TOÁN 6 - CÚN 📐
        Bài học: [Tên bài học]
        Cấp độ: [Dễ / Trung bình / Khó]
        Điểm số: [Số điểm/Tổng số câu]
        Thời gian làm bài: [Phút:Giây]
        Bố Mẹ xem lại quá trình học của con nhé! ❤️
        ```

---

## 6. Verification & Testing

*   **Automated Tests**:
    *   Unit tests in Jest/Vitest for testing the score calculation, heart deduction logic, local storage saving, and JSON schema validation.
    *   Playwright E2E tests to verify completion logic, navigation, and Zalo clipboard copy.
*   **Manual Verification**:
    *   Verify layout responsiveness on iPad aspect ratios and various screen sizes (using browser developer tools).
