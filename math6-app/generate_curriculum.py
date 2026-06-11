import json
import os

# Define the updated content for the 18 placeholder lessons
LESSONS_DATA = {
    "bai-3-thu-tu-trong-tap-hop-cac-so-tu-nhien": {
        "description": "So sánh các số tự nhiên, biểu diễn số tự nhiên trên tia số và hiểu các ký hiệu lớn hơn hoặc bằng (≥), nhỏ hơn hoặc bằng (≤).",
        "theory": {
            "explanation": "Trong hai số tự nhiên khác nhau, luôn có một số nhỏ hơn số kia. Ta dùng tia số để biểu diễn các số tự nhiên. Trên tia số nằm ngang, điểm biểu diễn số nhỏ hơn nằm bên trái điểm biểu diễn số lớn hơn. Ngoài ra, ta còn dùng ký hiệu ≤ (nhỏ hơn hoặc bằng) và ≥ (lớn hơn hoặc bằng). Ví dụ: x ≤ 4 với x ∈ N có nghĩa là x có thể là 0, 1, 2, 3, 4.",
            "visualizerType": None,
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q3_easy_1",
                    "type": "multiple-choice",
                    "question": "So sánh hai số tự nhiên: 1205 và 1250.",
                    "options": ["1205 < 1250", "1205 > 1250", "1205 = 1250", "Không so sánh được"],
                    "correctAnswer": "1205 < 1250",
                    "explanation": "Chữ số ở hàng chục của 1250 là 5 lớn hơn chữ số ở hàng chục của 1205 là 0. Do đó 1205 < 1250."
                },
                {
                    "id": "q3_easy_2",
                    "type": "multiple-choice",
                    "question": "Điểm biểu diễn số 7 trên tia số nằm ngang nằm ở phía nào so với điểm biểu diễn số 9?",
                    "options": ["Bên trái", "Bên phải", "Trùng nhau", "Phía trên"],
                    "correctAnswer": "Bên trái",
                    "explanation": "Vì 7 < 9 nên trên tia số nằm ngang, điểm biểu diễn số 7 nằm ở bên trái điểm biểu diễn số 9."
                }
            ],
            "medium": [
                {
                    "id": "q3_med_1",
                    "type": "multiple-choice",
                    "question": "Tìm tập hợp các số tự nhiên x sao cho 7 < x ≤ 10.",
                    "options": ["{8, 9, 10}", "{7, 8, 9}", "{7, 8, 9, 10}", "{8, 9}"],
                    "correctAnswer": "{8, 9, 10}",
                    "explanation": "x là số tự nhiên lớn hơn 7 và nhỏ hơn hoặc bằng 10, nên x nhận các giá trị: 8, 9, 10. Tập hợp đó là {8, 9, 10}."
                },
                {
                    "id": "q3_med_2",
                    "type": "multiple-choice",
                    "question": "Cho ba số tự nhiên a, b, c thỏa mãn: a < b và b < c. Khẳng định nào sau đây luôn đúng?",
                    "options": ["a < c", "a > c", "a = c", "b < a"],
                    "correctAnswer": "a < c",
                    "explanation": "Theo tính chất bắc cầu của quan hệ so sánh, vì a < b và b < c nên a < c."
                }
            ],
            "hard": [
                {
                    "id": "q3_hard_1",
                    "type": "multiple-choice",
                    "question": "Tìm số tự nhiên nhỏ nhất có 4 chữ số khác nhau.",
                    "options": ["1023", "1000", "1234", "1024"],
                    "correctAnswer": "1023",
                    "explanation": "Để số tự nhiên có 4 chữ số là nhỏ nhất, chữ số hàng nghìn phải là 1 (chữ số nhỏ nhất khác 0), chữ số hàng trăm tiếp theo là 0, chữ số hàng chục là 2 và hàng đơn vị là 3. Số đó là 1023."
                },
                {
                    "id": "q3_hard_2",
                    "type": "multiple-choice",
                    "question": "Cho tập hợp A = {x ∈ N | 15 ≤ x < 20}. Tập hợp A có bao nhiêu phần tử?",
                    "options": ["5 phần tử", "6 phần tử", "4 phần tử", "20 phần tử"],
                    "correctAnswer": "5 phần tử",
                    "explanation": "Tập hợp A gồm các số tự nhiên từ 15 đến 19: {15, 16, 17, 18, 19}. Số lượng phần tử là 19 - 15 + 1 = 5 phần tử."
                }
            ]
        }
    },
    "bai-4-phep-cong-va-phep-tru-so-tu-nhien": {
        "description": "Thực hiện phép cộng và phép trừ các số tự nhiên, áp dụng tính chất giao hoán, kết hợp để tính nhanh.",
        "theory": {
            "explanation": "Phép cộng có tính chất giao hoán (a + b = b + a) và tính chất kết hợp ((a + b) + c = a + (b + c)). Số 0 cộng với số nào cũng bằng chính nó. Phép trừ a - b chỉ thực hiện được trong tập số tự nhiên khi a ≥ b. Ta có thể áp dụng các tính chất này để nhóm các số tròn chục, tròn trăm giúp tính toán nhanh chóng.",
            "visualizerType": None,
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q4_easy_1",
                    "type": "multiple-choice",
                    "question": "Kết quả của phép tính 125 + 75 là bao nhiêu?",
                    "options": ["200", "190", "210", "100"],
                    "correctAnswer": "200",
                    "explanation": "Cộng hai số ta được: 125 + 75 = 200."
                },
                {
                    "id": "q4_easy_2",
                    "type": "multiple-choice",
                    "question": "Tìm số tự nhiên x thỏa mãn: x - 12 = 8.",
                    "options": ["20", "4", "96", "8"],
                    "correctAnswer": "20",
                    "explanation": "Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ: x = 8 + 12 = 20."
                }
            ],
            "medium": [
                {
                    "id": "q4_med_1",
                    "type": "multiple-choice",
                    "question": "Tính nhanh tổng sau: 24 + 17 + 76.",
                    "options": ["117", "100", "97", "124"],
                    "correctAnswer": "117",
                    "explanation": "Áp dụng tính chất giao hoán và kết hợp: (24 + 76) + 17 = 100 + 17 = 117."
                },
                {
                    "id": "q4_med_2",
                    "type": "multiple-choice",
                    "question": "Một cửa hàng buổi sáng bán được 120 kg gạo, buổi chiều bán được nhiều hơn buổi sáng 30 kg. Hỏi cả hai buổi bán được bao nhiêu kg gạo?",
                    "options": ["270 kg", "150 kg", "240 kg", "300 kg"],
                    "correctAnswer": "270 kg",
                    "explanation": "Buổi chiều cửa hàng bán được: 120 + 30 = 150 kg. Cả hai buổi bán được: 120 + 150 = 270 kg."
                }
            ],
            "hard": [
                {
                    "id": "q4_hard_1",
                    "type": "multiple-choice",
                    "question": "Tìm hiệu của số tự nhiên lớn nhất có 3 chữ số và số tự nhiên nhỏ nhất có 3 chữ số khác nhau.",
                    "options": ["897", "899", "896", "900"],
                    "correctAnswer": "897",
                    "explanation": "Số tự nhiên lớn nhất có 3 chữ số là 999. Số tự nhiên nhỏ nhất có 3 chữ số khác nhau là 102. Hiệu của chúng là: 999 - 102 = 897."
                },
                {
                    "id": "q4_hard_2",
                    "type": "multiple-choice",
                    "question": "Tìm số tự nhiên x biết: (x - 5) + 120 = 200.",
                    "options": ["85", "75", "95", "65"],
                    "correctAnswer": "85",
                    "explanation": "Ta có: x - 5 = 200 - 120 = 80. Do đó: x = 80 + 5 = 85."
                }
            ]
        }
    },
    "bai-5-phep-nhan-va-phep-chia-so-tu-nhien": {
        "description": "Thực hiện phép nhân, phép chia hết và phép chia có dư; áp dụng tính chất phân phối để tính nhẩm nhanh.",
        "theory": {
            "explanation": "Phép nhân có tính chất giao hoán (a * b = b * a), kết hợp ((a * b) * c = a * (b * c)) và phân phối đối với phép cộng (a * (b + c) = a * b + a * c). Với phép chia hai số tự nhiên a và b (b ≠ 0), ta luôn tìm được hai số tự nhiên q (thương) và r (số dư) sao cho a = b * q + r (với 0 ≤ r < b). Nếu r = 0 ta có phép chia hết, nếu r > 0 ta có phép chia có dư.",
            "visualizerType": None,
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q5_easy_1",
                    "type": "multiple-choice",
                    "question": "Kết quả của phép tính 25 * 4 * 7 là bao nhiêu?",
                    "options": ["700", "175", "100", "280"],
                    "correctAnswer": "700",
                    "explanation": "Áp dụng tính chất kết hợp: (25 * 4) * 7 = 100 * 7 = 700."
                },
                {
                    "id": "q5_easy_2",
                    "type": "multiple-choice",
                    "question": "Một phép chia có số bị chia là 45 và số chia là 6. Thương và số dư của phép chia này lần lượt là:",
                    "options": ["Thương là 7, dư 3", "Thương là 7, dư 5", "Thương là 8, dư 3", "Thương là 6, dư 9"],
                    "correctAnswer": "Thương là 7, dư 3",
                    "explanation": "Ta có 45 = 6 * 7 + 3. Vì số dư 3 < 6 nên thương là 7 và số dư là 3."
                }
            ],
            "medium": [
                {
                    "id": "q5_med_1",
                    "type": "multiple-choice",
                    "question": "Tính nhẩm nhanh bằng cách áp dụng tính chất phân phối: 35 * 99.",
                    "options": ["3465", "3500", "3435", "3565"],
                    "correctAnswer": "3465",
                    "explanation": "Ta viết 35 * 99 = 35 * (100 - 1) = 35 * 100 - 35 * 1 = 3500 - 35 = 3465."
                },
                {
                    "id": "q5_med_2",
                    "type": "multiple-choice",
                    "question": "Tìm số tự nhiên x biết: 12 * x = 240.",
                    "options": ["20", "22", "18", "12"],
                    "correctAnswer": "20",
                    "explanation": "Muốn tìm thừa số chưa biết, ta lấy tích chia cho thừa số đã biết: x = 240 / 12 = 20."
                }
            ],
            "hard": [
                {
                    "id": "q5_hard_1",
                    "type": "multiple-choice",
                    "question": "Một đoàn khách gồm 145 người cần thuê xe 16 chỗ để đi du lịch. Hỏi đoàn khách cần thuê ít nhất bao nhiêu xe?",
                    "options": ["10 xe", "9 xe", "8 xe", "11 xe"],
                    "correctAnswer": "10 xe",
                    "explanation": "Ta thực hiện phép chia: 145 / 16 = 9 (dư 1). Như vậy, 9 xe chở được 144 người và vẫn còn thừa 1 người. Do đó, cần thuê ít nhất 9 + 1 = 10 xe."
                },
                {
                    "id": "q5_hard_2",
                    "type": "multiple-choice",
                    "question": "Trong một phép chia có dư, số chia là 15, thương là 8 và số dư là số dư lớn nhất có thể có. Tìm số bị chia.",
                    "options": ["134", "120", "135", "129"],
                    "correctAnswer": "134",
                    "explanation": "Vì số chia là 15 nên số dư lớn nhất có thể có là 14. Số bị chia là: 15 * 8 + 14 = 120 + 14 = 134."
                }
            ]
        }
    },
    "bai-6-luy-thua-voi-so-mu-tu-nhien": {
        "description": "Lũy thừa bậc n của một số, nhân và chia hai lũy thừa cùng cơ số.",
        "theory": {
            "explanation": "Lũy thừa bậc n của a là tích của n thừa số bằng nhau, mỗi thừa số bằng a: a^n = a * a * ... * a (n thừa số a, n khác 0). Ta gọi a là cơ số, n là số mũ. Quy tắc nhân hai lũy thừa cùng cơ số: a^m * a^n = a^(m+n). Quy tắc chia hai lũy thừa cùng cơ số: a^m / a^n = a^(m-n) (với a khác 0, m ≥ n). Quy ước: a^0 = 1 (a khác 0).",
            "visualizerType": None,
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q6_easy_1",
                    "type": "multiple-choice",
                    "question": "Viết tích 3 * 3 * 3 * 3 dưới dạng lũy thừa:",
                    "options": ["3^4", "4^3", "12", "81"],
                    "correctAnswer": "3^4",
                    "explanation": "Có 4 thừa số 3 nhân với nhau nên ta viết dưới dạng lũy thừa là 3^4."
                },
                {
                    "id": "q6_easy_2",
                    "type": "multiple-choice",
                    "question": "Trong lũy thừa 5^3, cơ số và số mũ lần lượt là:",
                    "options": ["Cơ số là 5, số mũ là 3", "Cơ số là 3, số mũ là 5", "Cơ số là 5, số mũ là 15", "Cơ số là 15, số mũ là 3"],
                    "correctAnswer": "Cơ số là 5, số mũ là 3",
                    "explanation": "Ở biểu thức lũy thừa a^n, a được gọi là cơ số và n được gọi là số mũ. Vậy ở 5^3, cơ số là 5 và số mũ là 3."
                }
            ],
            "medium": [
                {
                    "id": "q6_med_1",
                    "type": "multiple-choice",
                    "question": "Tính tích của hai lũy thừa cùng cơ số: 2^3 * 2^4.",
                    "options": ["2^7", "2^12", "4^7", "128"],
                    "correctAnswer": "2^7",
                    "explanation": "Khi nhân hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và cộng các số mũ: 2^3 * 2^4 = 2^(3+4) = 2^7."
                },
                {
                    "id": "q6_med_2",
                    "type": "multiple-choice",
                    "question": "Tính giá trị của biểu thức: 5^3 - 3^2.",
                    "options": ["116", "6", "118", "14"],
                    "correctAnswer": "116",
                    "explanation": "Ta có 5^3 = 5 * 5 * 5 = 125 và 3^2 = 3 * 3 = 9. Hiệu là: 125 - 9 = 116."
                }
            ],
            "hard": [
                {
                    "id": "q6_hard_1",
                    "type": "multiple-choice",
                    "question": "Tìm số tự nhiên x biết: 2^x = 32.",
                    "options": ["5", "4", "6", "16"],
                    "correctAnswer": "5",
                    "explanation": "Ta có 32 = 2 * 2 * 2 * 2 * 2 = 2^5. Do đó 2^x = 2^5 nên x = 5."
                },
                {
                    "id": "q6_hard_2",
                    "type": "multiple-choice",
                    "question": "Rút gọn biểu thức sau: (4^5 * 2^3) / 2^7.",
                    "options": ["2^6", "2^5", "2^4", "4"],
                    "correctAnswer": "2^6",
                    "explanation": "Ta đưa về cùng cơ số 2: 4^5 = (2^2)^5 = 2^10. Khi đó biểu thức trở thành (2^10 * 2^3) / 2^7 = 2^13 / 2^7 = 2^(13-7) = 2^6."
                }
            ]
        }
    },
    "bai-7-thu-tu-thuc-hien-cac-phep-tinh": {
        "description": "Quy tắc thứ tự thực hiện các phép tính đối với biểu thức có hoặc không có dấu ngoặc.",
        "theory": {
            "explanation": "Quy tắc thực hiện phép tính đối với biểu thức không có dấu ngoặc: Lũy thừa -> Nhân và chia -> Cộng và trừ. Đối với biểu thức có dấu ngoặc: Thực hiện trong ngoặc tròn () trước, rồi đến ngoặc vuông [], cuối cùng là ngoặc nhọn {}.",
            "visualizerType": None,
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q7_easy_1",
                    "type": "multiple-choice",
                    "question": "Tính giá trị của biểu thức: 20 - 4 * 3.",
                    "options": ["8", "48", "12", "16"],
                    "correctAnswer": "8",
                    "explanation": "Thực hiện phép nhân trước: 4 * 3 = 12. Sau đó thực hiện phép trừ: 20 - 12 = 8."
                },
                {
                    "id": "q7_easy_2",
                    "type": "multiple-choice",
                    "question": "Thứ tự đúng khi thực hiện các phép tính trong biểu thức có các dấu ngoặc là:",
                    "options": ["() -> [] -> {}", "{} -> [] -> ()", "[] -> () -> {}", "() -> {} -> []"],
                    "correctAnswer": "() -> [] -> {}",
                    "explanation": "Theo quy tắc, ta thực hiện các phép tính trong ngoặc tròn () trước, rồi đến ngoặc vuông [] và cuối cùng là ngoặc nhọn {}."
                }
            ],
            "medium": [
                {
                    "id": "q7_med_1",
                    "type": "multiple-choice",
                    "question": "Tính giá trị biểu thức: 3^2 * 5 - 2^3 * 4.",
                    "options": ["13", "17", "29", "21"],
                    "correctAnswer": "13",
                    "explanation": "Tính lũy thừa trước: 3^2 = 9 và 2^3 = 8. Thực hiện phép nhân: 9 * 5 = 45 và 8 * 4 = 32. Cuối cùng thực hiện phép trừ: 45 - 32 = 13."
                },
                {
                    "id": "q7_med_2",
                    "type": "multiple-choice",
                    "question": "Tính giá trị biểu thức: 100 - [30 - (5 - 1)^2].",
                    "options": ["86", "84", "94", "76"],
                    "correctAnswer": "86",
                    "explanation": "Tính trong ngoặc tròn trước: 5 - 1 = 4. Lũy thừa: 4^2 = 16. Tính trong ngoặc vuông: 30 - 16 = 14. Cuối cùng tính: 100 - 14 = 86."
                }
            ],
            "hard": [
                {
                    "id": "q7_hard_1",
                    "type": "multiple-choice",
                    "question": "Tìm số tự nhiên x biết: 5 * (x - 3) + 3 = 3^2 * 2.",
                    "options": ["6", "5", "7", "4"],
                    "correctAnswer": "6",
                    "explanation": "Ta có vế phải: 3^2 * 2 = 9 * 2 = 18. Phương trình là 5 * (x - 3) + 3 = 18 => 5 * (x - 3) = 15 => x - 3 = 3 => x = 6."
                },
                {
                    "id": "q7_hard_2",
                    "type": "multiple-choice",
                    "question": "Tính giá trị biểu thức: A = 120 / {54 - [50 - (2^3 * 5 - 2^2 * 5)]}.",
                    "options": ["5", "2", "3", "4"],
                    "correctAnswer": "5",
                    "explanation": "Tính trong ngoặc tròn: 2^3 * 5 - 2^2 * 5 = 8 * 5 - 4 * 5 = 40 - 20 = 20. Ngoặc vuông: 50 - 20 = 30. Ngoặc nhọn: 54 - 30 = 24. Kết quả: A = 120 / 24 = 5."
                }
            ]
        }
    },
    "bai-8-quan-he-chia-het-va-tinh-chat": {
        "description": "Khái niệm chia hết, ước và bội, cùng tính chất chia hết của một tổng.",
        "theory": {
            "explanation": "Cho hai số tự nhiên a và b (b ≠ 0). Nếu có số tự nhiên q sao cho a = b * q thì ta nói a chia hết cho b, ký hiệu là a ⋮ b. Khi đó, a là bội của b, và b là ước của a. Tính chất chia hết của một tổng: Nếu tất cả các số hạng của một tổng đều chia hết cho cùng một số thì tổng chia hết cho số đó: (a ⋮ m và b ⋮ m) => (a + b) ⋮ m. Nếu một số hạng không chia hết, các số hạng còn lại đều chia hết thì tổng không chia hết cho số đó.",
            "visualizerType": "DivisibilitySieve",
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q8_easy_1",
                    "type": "multiple-choice",
                    "question": "Khẳng định nào sau đây là ĐÚNG về quan hệ chia hết?",
                    "options": ["15 là bội của 5", "5 là bội của 15", "15 là ước của 5", "5 chia hết cho 15"],
                    "correctAnswer": "15 là bội của 5",
                    "explanation": "Vì 15 chia hết cho 5 (15 = 5 * 3) nên 15 là bội của 5 và 5 là ước của 15."
                },
                {
                    "id": "q8_easy_2",
                    "type": "multiple-choice",
                    "question": "Số nào sau đây là ước của 12?",
                    "options": ["5", "8", "4", "10"],
                    "correctAnswer": "4",
                    "explanation": "Ước của 12 là các số tự nhiên mà 12 chia hết cho nó. Trong các số trên, chỉ có 4 là ước của 12 vì 12 / 4 = 3."
                }
            ],
            "medium": [
                {
                    "id": "q8_med_1",
                    "type": "multiple-choice",
                    "question": "Nếu a chia hết cho 6 và b chia hết cho 6 thì tổng (a + b) chắc chắn chia hết cho số nào dưới đây?",
                    "options": ["6", "12", "18", "36"],
                    "correctAnswer": "6",
                    "explanation": "Theo tính chất chia hết của một tổng, nếu mỗi số hạng của tổng đều chia hết cho 6 thì tổng (a + b) cũng chia hết cho 6."
                },
                {
                    "id": "q8_med_2",
                    "type": "multiple-choice",
                    "question": "Tìm tập hợp các bội của 7 nhỏ hơn 30.",
                    "options": ["{0, 7, 14, 21, 28}", "{7, 14, 21, 28}", "{0, 7, 14, 21, 28, 35}", "{1, 7, 14, 21, 28}"],
                    "correctAnswer": "{0, 7, 14, 21, 28}",
                    "explanation": "Bội của 7 gồm các số: 0, 7, 14, 21, 28, 35, ... Các bội nhỏ hơn 30 là 0, 7, 14, 21, 28. Vậy tập hợp đó là {0, 7, 14, 21, 28}."
                }
            ],
            "hard": [
                {
                    "id": "q8_hard_1",
                    "type": "multiple-choice",
                    "question": "Tìm tập hợp các số tự nhiên x sao cho (x + 12) chia hết cho x.",
                    "options": ["x ∈ {1, 2, 3, 4, 6, 12}", "x ∈ {2, 3, 4, 6}", "x ∈ {1, 2, 3, 4}", "x ∈ {1, 2, 3, 4, 6}"],
                    "correctAnswer": "x ∈ {1, 2, 3, 4, 6, 12}",
                    "explanation": "Vì x chia hết cho x, nên để (x + 12) chia hết cho x thì 12 phải chia hết cho x. Suy ra x là ước của 12. Vậy x ∈ {1, 2, 3, 4, 6, 12}."
                },
                {
                    "id": "q8_hard_2",
                    "type": "multiple-choice",
                    "question": "Cho tổng S = 14 + 21 + x (với x ∈ N). Điều kiện để S không chia hết cho 7 là:",
                    "options": ["x không chia hết cho 7", "x chia hết cho 7", "x là số lẻ", "x là số chẵn"],
                    "correctAnswer": "x không chia hết cho 7",
                    "explanation": "Vì 14 và 21 đều chia hết cho 7, nên để tổng S không chia hết cho 7 thì số hạng còn lại x phải không chia hết cho 7."
                }
            ]
        }
    },
    "bai-9-dau-hieu-chia-het": {
        "description": "Nhận biết các số chia hết cho 2, 5, 3 và 9 dựa trên chữ số tận cùng và tổng các chữ số.",
        "theory": {
            "explanation": "Dấu hiệu chia hết cho 2: Các số có chữ số tận cùng là chữ số chẵn (0, 2, 4, 6, 8). Dấu hiệu chia hết cho 5: Các số có chữ số tận cùng là 0 hoặc 5. Dấu hiệu chia hết cho 3: Các số có tổng các chữ số chia hết cho 3. Dấu hiệu chia hết cho 9: Các số có tổng các chữ số chia hết cho 9. Lưu ý: các số chia hết cho 9 thì cũng chia hết cho 3, nhưng các số chia hết cho 3 chưa chắc chia hết cho 9.",
            "visualizerType": "DivisibilitySieve",
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q9_easy_1",
                    "type": "multiple-choice",
                    "question": "Số nào sau đây chia hết cho cả 2 và 5?",
                    "options": ["120", "125", "122", "103"],
                    "correctAnswer": "120",
                    "explanation": "Số chia hết cho cả 2 và 5 phải có chữ số tận cùng là 0. Trong các số trên, chỉ có 120 thỏa mãn."
                },
                {
                    "id": "q9_easy_2",
                    "type": "multiple-choice",
                    "question": "Trong các số sau, số nào chia hết cho 9?",
                    "options": ["234", "123", "456", "789"],
                    "correctAnswer": "234",
                    "explanation": "Tổng các chữ số của 234 là 2 + 3 + 4 = 9, chia hết cho 9. Do đó số 234 chia hết cho 9."
                }
            ],
            "medium": [
                {
                    "id": "q9_med_1",
                    "type": "multiple-choice",
                    "question": "Tìm các chữ số x sao cho số 35x chia hết cho 3.",
                    "options": ["x ∈ {1, 4, 7}", "x ∈ {0, 3, 6, 9}", "x ∈ {1, 5}", "x ∈ {2, 5, 8}"],
                    "correctAnswer": "x ∈ {1, 4, 7}",
                    "explanation": "Tổng các chữ số của 35x là 3 + 5 + x = 8 + x. Để số này chia hết cho 3 thì (8 + x) phải chia hết cho 3. Với x là chữ số (0 đến 9), ta tìm được x ∈ {1, 4, 7}."
                },
                {
                    "id": "q9_med_2",
                    "type": "multiple-choice",
                    "question": "Cho số A = 2026. Số A chia cho 5 dư bao nhiêu?",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "1",
                    "explanation": "Số A có chữ số tận cùng là 6. Số chia hết cho 5 gần nhất nhỏ hơn 2026 là 2025. Vậy số dư là 2026 - 2025 = 1."
                }
            ],
            "hard": [
                {
                    "id": "q9_hard_1",
                    "type": "multiple-choice",
                    "question": "Tìm chữ số x và y để số 1x2y chia hết cho cả 2, 5 và 9.",
                    "options": ["x = 6, y = 0", "x = 5, y = 0", "x = 6, y = 5", "x = 9, y = 0"],
                    "correctAnswer": "x = 6, y = 0",
                    "explanation": "Vì số 1x2y chia hết cho cả 2 và 5 nên chữ số tận cùng y = 0. Khi đó số có dạng 1x20. Để số này chia hết cho 9 thì tổng các chữ số (1 + x + 2 + 0) = 3 + x phải chia hết cho 9. Suy ra x = 6. Vậy x = 6, y = 0."
                },
                {
                    "id": "q9_hard_2",
                    "type": "multiple-choice",
                    "question": "Có bao nhiêu số tự nhiên có hai chữ số chia hết cho 9?",
                    "options": ["10", "9", "11", "12"],
                    "correctAnswer": "10",
                    "explanation": "Các số tự nhiên có hai chữ số chia hết cho 9 là 18, 27, 36, ..., 99. Số lượng số hạng là (99 - 18) / 9 + 1 = 10 số."
                }
            ]
        }
    },
    "bai-10-so-nguyen-to": {
        "description": "Tìm hiểu số nguyên tố, hợp số và phân tích một số ra thừa số nguyên tố.",
        "theory": {
            "explanation": "Số nguyên tố là số tự nhiên lớn hơn 1, chỉ có hai ước là 1 và chính nó. Hợp số là số tự nhiên lớn hơn 1, có nhiều hơn hai ước. Số 0 và số 1 không là số nguyên tố cũng không là hợp số. Số nguyên tố nhỏ nhất và cũng là số nguyên tố chẵn duy nhất là số 2. Phân tích một số tự nhiên lớn hơn 1 ra thừa số nguyên tố là viết số đó dưới dạng tích của các thừa số nguyên tố.",
            "visualizerType": "DivisibilitySieve",
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q10_easy_1",
                    "type": "multiple-choice",
                    "question": "Số nào sau đây là số nguyên tố?",
                    "options": ["2", "9", "15", "1"],
                    "correctAnswer": "2",
                    "explanation": "Số 2 chỉ có hai ước là 1 và 2 nên là số nguyên tố. Số 9 và 15 có nhiều hơn hai ước. Số 1 không phải số nguyên tố."
                },
                {
                    "id": "q10_easy_2",
                    "type": "multiple-choice",
                    "question": "Khẳng định nào sau đây là ĐÚNG?",
                    "options": ["Số 0 không là số nguyên tố", "Mọi số nguyên tố đều là số lẻ", "Hợp số là số chỉ chia hết cho 1 và chính nó", "Số 1 là số nguyên tố nhỏ nhất"],
                    "correctAnswer": "Số 0 không là số nguyên tố",
                    "explanation": "Số nguyên tố phải lớn hơn 1, nên số 0 không là số nguyên tố. Số 2 là số nguyên tố chẵn nên khẳng định 'mọi số nguyên tố đều lẻ' là sai."
                }
            ],
            "medium": [
                {
                    "id": "q10_med_1",
                    "type": "multiple-choice",
                    "question": "Phân tích số 24 ra thừa số nguyên tố ta được kết quả:",
                    "options": ["2^3 * 3", "2 * 12", "3 * 8", "2^2 * 6"],
                    "correctAnswer": "2^3 * 3",
                    "explanation": "Ta có 24 = 2 * 12 = 2 * 2 * 6 = 2 * 2 * 2 * 3 = 2^3 * 3. Các cơ số 2 và 3 đều là các số nguyên tố."
                },
                {
                    "id": "q10_med_2",
                    "type": "multiple-choice",
                    "question": "Tìm tất cả các số nguyên tố x thỏa mãn: 10 < x < 20.",
                    "options": ["{11, 13, 17, 19}", "{11, 13, 15, 17, 19}", "{13, 17, 19}", "{11, 13, 17}"],
                    "correctAnswer": "{11, 13, 17, 19}",
                    "explanation": "Các số tự nhiên nằm giữa 10 và 20 là 11, 12, 13, 14, 15, 16, 17, 18, 19. Trong đó các số nguyên tố là 11, 13, 17, 19."
                }
            ],
            "hard": [
                {
                    "id": "q10_hard_1",
                    "type": "multiple-choice",
                    "question": "Tích của hai số nguyên tố khác nhau là một số như thế nào?",
                    "options": ["Hợp số", "Số nguyên tố", "Số lẻ", "Số 1"],
                    "correctAnswer": "Hợp số",
                    "explanation": "Tích của hai số nguyên tố p1 và p2 sẽ chia hết cho 1, p1, p2 và p1*p2. Do có nhiều hơn hai ước nên tích đó chắc chắn là hợp số."
                },
                {
                    "id": "q10_hard_2",
                    "type": "multiple-choice",
                    "question": "Tìm số tự nhiên x sao cho 3 * x là một số nguyên tố.",
                    "options": ["x = 1", "x = 3", "x = 0", "Không có số nào"],
                    "correctAnswer": "x = 1",
                    "explanation": "If x = 1, tích bằng 3 là số nguyên tố. Nếu x > 1, tích 3 * x có ít nhất ba ước là 1, 3 và 3 * x nên sẽ là hợp số. Do đó x = 1."
                }
            ]
        }
    },
    "bai-11-uoc-chung-uoc-chung-lon-nhat": {
        "description": "Ước chung, ước chung lớn nhất (ƯCLN) và cách tìm bằng thừa số nguyên tố.",
        "theory": {
            "explanation": "Ước chung của hai hay nhiều số là ước của tất cả các số đó. Ước chung lớn nhất (ƯCLN) của hai hay nhiều số là số lớn nhất trong tập hợp các ước chung của các số đó. Cách tìm ƯCLN bằng phân tích ra thừa số nguyên tố: 1. Phân tích mỗi số ra thừa số nguyên tố. 2. Chọn ra các thừa số nguyên tố chung. 3. Lập tích các thừa số đã chọn, mỗi thừa số lấy với số mũ nhỏ nhất của nó. Tích đó là ƯCLN cần tìm. Hai số có ƯCLN bằng 1 gọi là hai số nguyên tố cùng nhau.",
            "visualizerType": "DivisibilitySieve",
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q11_easy_1",
                    "type": "multiple-choice",
                    "question": "Tìm tập hợp ước chung của 6 và 9.",
                    "options": ["{1, 3}", "{1, 2, 3}", "{3}", "{1, 9}"],
                    "correctAnswer": "{1, 3}",
                    "explanation": "Ư(6) = {1, 2, 3, 6}; Ư(9) = {1, 3, 9}. Tập hợp ước chung (phần tử chung của cả hai tập hợp) là {1, 3}."
                },
                {
                    "id": "q11_easy_2",
                    "type": "multiple-choice",
                    "question": "Tìm ƯCLN của hai số 8 và 12.",
                    "options": ["4", "2", "8", "1"],
                    "correctAnswer": "4",
                    "explanation": "Các ước chung của 8 và 12 là {1, 2, 4}. Ước chung lớn nhất là 4."
                }
            ],
            "medium": [
                {
                    "id": "q11_med_1",
                    "type": "multiple-choice",
                    "question": "Tìm ƯCLN(18, 30) bằng cách phân tích ra thừa số nguyên tố.",
                    "options": ["6", "3", "2", "18"],
                    "correctAnswer": "6",
                    "explanation": "Ta có 18 = 2 * 3^2; 30 = 2 * 3 * 5. Các thừa số nguyên tố chung là 2 và 3. Lấy với số mũ nhỏ nhất ta được ƯCLN(18, 30) = 2^1 * 3^1 = 6."
                },
                {
                    "id": "q11_med_2",
                    "type": "multiple-choice",
                    "question": "Hai số nào sau đây là hai số nguyên tố cùng nhau?",
                    "options": ["8 và 9", "6 và 9", "4 và 6", "10 và 15"],
                    "correctAnswer": "8 và 9",
                    "explanation": "ƯCLN(8, 9) = 1 nên 8 và 9 là hai số nguyên tố cùng nhau. Các cặp số còn lại đều có ước chung lớn hơn 1."
                }
            ],
            "hard": [
                {
                    "id": "q11_hard_1",
                    "type": "multiple-choice",
                    "question": "Một lớp học có 24 nam và 18 nữ. Cô giáo muốn chia lớp thành các nhóm sao cho số nam và số nữ ở mỗi nhóm đều bằng nhau. Hỏi cô giáo có thể chia được nhiều nhất bao nhiêu nhóm?",
                    "options": ["6 nhóm", "8 nhóm", "4 nhóm", "3 nhóm"],
                    "correctAnswer": "6 nhóm",
                    "explanation": "Số nhóm nhiều nhất là ƯCLN(24, 18). Phân tích: 24 = 2^3 * 3; 18 = 2 * 3^2. Khi đó ƯCLN(24, 18) = 2 * 3 = 6. Vậy chia được nhiều nhất 6 nhóm."
                },
                {
                    "id": "q11_hard_2",
                    "type": "multiple-choice",
                    "question": "Tìm số tự nhiên x lớn nhất biết rằng 48 chia hết cho x và 72 chia hết cho x.",
                    "options": ["24", "12", "48", "8"],
                    "correctAnswer": "24",
                    "explanation": "Vì 48 ⋮ x và 72 ⋮ x nên x là ước chung của 48 và 72. Vì x lớn nhất nên x = ƯCLN(48, 72). Ta có 48 = 2^4 * 3; 72 = 2^3 * 3^2. ƯCLN(48, 72) = 2^3 * 3 = 24."
                }
            ]
        }
    },
    "bai-12-boi-chung-boi-chung-nho-nhat": {
        "description": "Bội chung, bội chung nhỏ nhất (BCNN) và phương pháp tìm bằng thừa số nguyên tố.",
        "theory": {
            "explanation": "Bội chung của hai hay nhiều số là bội của tất cả các số đó. Bội chung nhỏ nhất (BCNN) của hai hay nhiều số là số nhỏ nhất khác 0 trong tập hợp các bội chung của các số đó. Cách tìm BCNN bằng phân tích ra thừa số nguyên tố: 1. Phân tích mỗi số ra thừa số nguyên tố. 2. Chọn ra các thừa số nguyên tố chung và riêng. 3. Lập tích các thừa số đã chọn, mỗi thừa số lấy với số mũ lớn nhất của nó. Tích đó là BCNN cần tìm.",
            "visualizerType": "DivisibilitySieve",
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q12_easy_1",
                    "type": "multiple-choice",
                    "question": "Tìm BCNN của hai số 4 và 6.",
                    "options": ["12", "24", "6", "2"],
                    "correctAnswer": "12",
                    "explanation": "Bội dương của 4: {4, 8, 12, 16, ...}; Bội dương của 6: {6, 12, 18, ...}. Số nhỏ nhất xuất hiện ở cả hai tập hợp là 12, nên BCNN(4, 6) = 12."
                },
                {
                    "id": "q12_easy_2",
                    "type": "multiple-choice",
                    "question": "Bội chung nhỏ nhất của số tự nhiên a khác 0 và số 1 là:",
                    "options": ["a", "1", "a * 1", "0"],
                    "correctAnswer": "a",
                    "explanation": "Với mọi số tự nhiên a khác 0, BCNN(a, 1) luôn bằng chính số a."
                }
            ],
            "medium": [
                {
                    "id": "q12_med_1",
                    "type": "multiple-choice",
                    "question": "Tìm BCNN(12, 18) bằng cách phân tích ra thừa số nguyên tố.",
                    "options": ["36", "72", "18", "54"],
                    "correctAnswer": "36",
                    "explanation": "Ta có 12 = 2^2 * 3; 18 = 2 * 3^2. Thừa số nguyên tố chung và riêng là 2 và 3. Lấy số mũ lớn nhất ta có BCNN(12, 18) = 2^2 * 3^2 = 4 * 9 = 36."
                },
                {
                    "id": "q12_med_2",
                    "type": "multiple-choice",
                    "question": "Tìm tập hợp các bội chung nhỏ hơn 50 của hai số 8 và 12.",
                    "options": ["{0, 24, 48}", "{24, 48}", "{0, 12, 24, 36, 48}", "{0, 8, 16, 24, 32, 40, 48}"],
                    "correctAnswer": "{0, 24, 48}",
                    "explanation": "Ta có BCNN(8, 12) = 24. Các bội chung là bội của 24: {0, 24, 48, 72, ...}. Các bội chung nhỏ hơn 50 là {0, 24, 48}."
                }
            ],
            "hard": [
                {
                    "id": "q12_hard_1",
                    "type": "multiple-choice",
                    "question": "An cứ 10 ngày trực nhật một lần, Bình cứ 12 ngày trực nhật một lần. Lần đầu cả hai cùng trực nhật chung một ngày. Sau ít nhất bao nhiêu ngày hai bạn lại cùng trực nhật?",
                    "options": ["60 ngày", "120 ngày", "30 ngày", "22 ngày"],
                    "correctAnswer": "60 ngày",
                    "explanation": "Số ngày ít nhất để hai bạn lại trực nhật chung là BCNN(10, 12). Phân tích: 10 = 2 * 5; 12 = 2^2 * 3. Khi đó BCNN(10, 12) = 2^2 * 3 * 5 = 60 ngày."
                },
                {
                    "id": "q12_hard_2",
                    "type": "multiple-choice",
                    "question": "Tìm số tự nhiên x nhỏ nhất khác 0 biết rằng x chia hết cho cả 15, 20 và 30.",
                    "options": ["60", "120", "30", "180"],
                    "correctAnswer": "60",
                    "explanation": "x is BCNN(15, 20, 30). Phân tích: 15 = 3 * 5; 20 = 2^2 * 5; 30 = 2 * 3 * 5. BCNN(15, 20, 30) = 2^2 * 3 * 5 = 60."
                }
            ]
        }
    },
    "bai-14-phep-cong-va-phep-tru-so-nguyen": {
        "description": "Thực hiện phép cộng hai số nguyên cùng dấu, khác dấu, phép trừ hai số nguyên và các tính chất.",
        "theory": {
            "explanation": "Cộng hai số nguyên cùng dấu: Ta cộng hai phần tự nhiên của chúng rồi đặt dấu chung đằng trước. Cộng hai số nguyên khác dấu: Nếu hai số đối nhau thì tổng bằng 0. Nếu không đối nhau, ta lấy số có phần tự nhiên lớn hơn trừ đi số có phần tự nhiên nhỏ hơn, rồi đặt trước kết quả dấu của số có phần tự nhiên lớn hơn. Phép trừ hai số nguyên: Muốn trừ số nguyên a cho số nguyên b, ta cộng a với số đối của b: a - b = a + (-b).",
            "visualizerType": "NumberLine",
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q14_easy_1",
                    "type": "multiple-choice",
                    "question": "Kết quả của phép tính (-5) + (-7) là bao nhiêu?",
                    "options": ["-12", "12", "-2", "2"],
                    "correctAnswer": "-12",
                    "explanation": "Cộng hai số nguyên âm ta cộng hai phần tự nhiên: 5 + 7 = 12, rồi đặt dấu trừ trước kết quả: -12."
                },
                {
                    "id": "q14_easy_2",
                    "type": "multiple-choice",
                    "question": "Kết quả của phép tính (-10) + 15 là bao nhiêu?",
                    "options": ["5", "-5", "25", "-25"],
                    "correctAnswer": "5",
                    "explanation": "Cộng hai số nguyên khác dấu, ta lấy 15 - 10 = 5. Kết quả mang dấu của số 15 (số có phần tự nhiên lớn hơn) nên là +5."
                }
            ],
            "medium": [
                {
                    "id": "q14_med_1",
                    "type": "multiple-choice",
                    "question": "Tính kết quả của phép trừ số nguyên: 8 - (-12).",
                    "options": ["20", "-4", "-20", "4"],
                    "correctAnswer": "20",
                    "explanation": "Quy tắc trừ số nguyên: a - b = a + (-b). Số đối của -12 là 12, do đó 8 - (-12) = 8 + 12 = 20."
                },
                {
                    "id": "q14_med_2",
                    "type": "multiple-choice",
                    "question": "Nhiệt độ ở Sa Pa buổi sáng là -2 °C, đến trưa nhiệt độ tăng thêm 5 °C. Hỏi nhiệt độ lúc trưa là bao nhiêu?",
                    "options": ["3 °C", "-7 °C", "7 °C", "-3 °C"],
                    "correctAnswer": "3 °C",
                    "explanation": "Nhiệt độ tăng thêm 5 °C tương ứng với phép tính: (-2) + 5 = 3 °C."
                }
            ],
            "hard": [
                {
                    "id": "q14_hard_1",
                    "type": "multiple-choice",
                    "question": "Cho biểu thức P = a - (b - c). Tính giá trị của P khi a = -10, b = -15, c = 5.",
                    "options": ["10", "-30", "-10", "20"],
                    "correctAnswer": "10",
                    "explanation": "Thay số vào biểu thức ta được: P = -10 - (-15 - 5) = -10 - (-20) = -10 + 20 = 10."
                },
                {
                    "id": "q14_hard_2",
                    "type": "multiple-choice",
                    "question": "Tìm số nguyên x biết: x - (-8) = -15.",
                    "options": ["-23", "-7", "7", "23"],
                    "correctAnswer": "-23",
                    "explanation": "Ta viết lại phương trình thành: x + 8 = -15 => x = -15 - 8 = -23."
                }
            ]
        }
    },
    "bai-15-quy-tac-dau-ngoac": {
        "description": "Cách bỏ dấu ngoặc khi tính toán biểu thức số nguyên để nhóm các số hạng hợp lý.",
        "theory": {
            "explanation": "Khi bỏ dấu ngoặc có dấu cộng (+) đằng trước, ta giữ nguyên dấu của các số hạng trong ngoặc: +(a - b + c) = a - b + c. Khi bỏ dấu ngoặc có dấu trừ (-) đằng trước, ta phải đổi dấu tất cả các số hạng trong ngoặc: dấu cộng thành dấu trừ và dấu trừ thành dấu cộng: -(a - b + c) = -a + b - c.",
            "visualizerType": None,
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q15_easy_1",
                    "type": "multiple-choice",
                    "question": "Bỏ dấu ngoặc của biểu thức A = -(x - y + z) ta được:",
                    "options": ["-x + y - z", "-x - y + z", "-x + y + z", "x - y - z"],
                    "correctAnswer": "-x + y - z",
                    "explanation": "Vì có dấu trừ đằng trước dấu ngoặc nên ta phải đổi dấu tất cả các hạng tử bên trong: x thành -x, -y thành +y, z thành -z. Kết quả: -x + y - z."
                },
                {
                    "id": "q15_easy_2",
                    "type": "multiple-choice",
                    "question": "Tính nhanh giá trị biểu thức: 15 + (12 - 15).",
                    "options": ["12", "-12", "18", "42"],
                    "correctAnswer": "12",
                    "explanation": "Bỏ dấu ngoặc có dấu cộng đằng trước: 15 + 12 - 15 = (15 - 15) + 12 = 0 + 12 = 12."
                }
            ],
            "medium": [
                {
                    "id": "q15_med_1",
                    "type": "multiple-choice",
                    "question": "Tính giá trị biểu thức: B = (125 - 47) - (125 - 47 - 10).",
                    "options": ["10", "-10", "20", "0"],
                    "correctAnswer": "10",
                    "explanation": "Áp dụng quy tắc bỏ dấu ngoặc: B = 125 - 47 - 125 + 47 + 10 = (125 - 125) + (-47 + 47) + 10 = 10."
                },
                {
                    "id": "q15_med_2",
                    "type": "multiple-choice",
                    "question": "Bỏ ngoặc và thu gọn biểu thức sau: (a + b) - (a - b).",
                    "options": ["2b", "0", "2a", "2a + 2b"],
                    "correctAnswer": "2b",
                    "explanation": "Bỏ dấu ngoặc: a + b - a + b = (a - a) + (b + b) = 2b."
                }
            ],
            "hard": [
                {
                    "id": "q15_hard_1",
                    "type": "multiple-choice",
                    "question": "Tính giá trị biểu thức: A = - (2025 - 34) - [34 - (2025 + 10)].",
                    "options": ["10", "-10", "20", "-20"],
                    "correctAnswer": "10",
                    "explanation": "Phá ngoặc ta được: A = -2025 + 34 - [34 - 2025 - 10] = -2025 + 34 - 34 + 2025 + 10 = (-2025 + 2025) + (34 - 34) + 10 = 10."
                },
                {
                    "id": "q15_hard_2",
                    "type": "multiple-choice",
                    "question": "Tìm số nguyên x biết: (x - 25) - (15 - x) = -20.",
                    "options": ["10", "20", "5", "0"],
                    "correctAnswer": "10",
                    "explanation": "Phá ngoặc ta được: x - 25 - 15 + x = -20 => 2x - 40 = -20 => 2x = 20 => x = 10."
                }
            ]
        }
    },
    "bai-16-phep-nhan-so-nguyen": {
        "description": "Nhân hai số nguyên cùng dấu, khác dấu và các tính chất cơ bản của phép nhân.",
        "theory": {
            "explanation": "Nhân hai số nguyên khác dấu: Tích là một số nguyên âm, ta nhân hai phần tự nhiên rồi đặt dấu trừ trước kết quả. Nhân hai số nguyên cùng dấu: Tích là một số nguyên dương, ta nhân hai phần tự nhiên với nhau. Các tính chất: giao hoán, kết hợp, nhân với 1, phân phối đối với phép cộng và phép trừ.",
            "visualizerType": None,
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q16_easy_1",
                    "type": "multiple-choice",
                    "question": "Kết quả của phép tính (-4) * 5 là:",
                    "options": ["-20", "20", "-9", "9"],
                    "correctAnswer": "-20",
                    "explanation": "Nhân hai số nguyên khác dấu ta được kết quả âm: (-4) * 5 = -20."
                },
                {
                    "id": "q16_easy_2",
                    "type": "multiple-choice",
                    "question": "Kết quả của phép tính (-3) * (-6) là:",
                    "options": ["18", "-18", "-9", "9"],
                    "correctAnswer": "18",
                    "explanation": "Nhân hai số nguyên cùng dấu âm ta được kết quả dương: (-3) * (-6) = 18."
                }
            ],
            "medium": [
                {
                    "id": "q16_med_1",
                    "type": "multiple-choice",
                    "question": "Tính giá trị biểu thức: (-25) * (-4) * (-7).",
                    "options": ["-700", "700", "-175", "175"],
                    "correctAnswer": "-700",
                    "explanation": "Ta có: (-25) * (-4) = 100. Tiếp tục nhân: 100 * (-7) = -700."
                },
                {
                    "id": "q16_med_2",
                    "type": "multiple-choice",
                    "question": "Tính bằng cách hợp lý nhất: (-15) * 45 + (-15) * 55.",
                    "options": ["-1500", "1500", "-150", "150"],
                    "correctAnswer": "-1500",
                    "explanation": "Áp dụng tính chất phân phối: (-15) * (45 + 55) = (-15) * 100 = -1500."
                }
            ],
            "hard": [
                {
                    "id": "q16_hard_1",
                    "type": "multiple-choice",
                    "question": "Cho tích P = x * y * z. Biết x, y, z đều là số nguyên âm. Hỏi tích P mang dấu gì?",
                    "options": ["Dấu âm", "Dấu dương", "Không mang dấu", "Tùy thuộc vào giá trị tuyệt đối của chúng"],
                    "correctAnswer": "Dấu âm",
                    "explanation": "Tích của một số lẻ các thừa số nguyên âm mang dấu âm. Vì có 3 số nguyên âm nên P mang dấu âm."
                },
                {
                    "id": "q16_hard_2",
                    "type": "multiple-choice",
                    "question": "Tính giá trị của biểu thức: A = (-2)^4 + (-3)^3.",
                    "options": ["-11", "11", "-43", "43"],
                    "correctAnswer": "-11",
                    "explanation": "Ta có (-2)^4 = 16 (số mũ chẵn cho kết quả dương), và (-3)^3 = -27 (số mũ lẻ cho kết quả âm). Tổng là 16 + (-27) = -11."
                }
            ]
        }
    },
    "bai-17-phep-chia-het-uoc-va-boi-cua-mot-so-nguyen": {
        "description": "Quan hệ chia hết, ước và bội trong tập hợp số nguyên Z.",
        "theory": {
            "explanation": "Cho a, b ∈ Z (b ≠ 0). Nếu có số nguyên q sao cho a = b * q thì ta nói a chia hết cho b, ký hiệu là a ⋮ b. Khi đó a là bội của b và b là ước của a. Chú ý: Nếu a ⋮ b thì (-a) ⋮ b và a ⋮ (-b). Ví dụ: Tập hợp các ước của 4 là {1, -1, 2, -2, 4, -4}.",
            "visualizerType": None,
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q17_easy_1",
                    "type": "multiple-choice",
                    "question": "Tập hợp các ước nguyên của 3 là:",
                    "options": ["{1, -1, 3, -3}", "{1, 3}", "{-1, -3}", "{0, 1, 3}"],
                    "correctAnswer": "{1, -1, 3, -3}",
                    "explanation": "Ước nguyên của 3 gồm cả các ước nguyên dương và nguyên âm: 1, -1, 3, -3."
                },
                {
                    "id": "q17_easy_2",
                    "type": "multiple-choice",
                    "question": "Số nào sau đây là bội của -4?",
                    "options": ["8", "6", "2", "-5"],
                    "correctAnswer": "8",
                    "explanation": "Vì 8 chia hết cho -4 (thương là -2) nên 8 là bội của -4."
                }
            ],
            "medium": [
                {
                    "id": "q17_med_1",
                    "type": "multiple-choice",
                    "question": "Tìm số nguyên x biết rằng 15 chia hết cho x và x < 0.",
                    "options": ["x ∈ {-1, -3, -5, -15}", "x ∈ {-3, -5}", "x ∈ {-1, -5}", "x ∈ {1, 3, 5, 15}"],
                    "correctAnswer": "x ∈ {-1, -3, -5, -15}",
                    "explanation": "x là ước âm của 15. Các ước âm của 15 là -1, -3, -5, -15."
                },
                {
                    "id": "q17_med_2",
                    "type": "multiple-choice",
                    "question": "If số nguyên a chia hết cho -6 thì a chắc chắn cũng chia hết cho số nào sau đây?",
                    "options": ["3", "4", "5", "12"],
                    "correctAnswer": "3",
                    "explanation": "Vì a chia hết cho -6 nên a cũng chia hết cho mọi ước của -6. Trong các số trên, chỉ có 3 là ước của -6."
                }
            ],
            "hard": [
                {
                    "id": "q17_hard_1",
                    "type": "multiple-choice",
                    "question": "Tìm tất cả các số nguyên x sao cho (x + 3) là ước của 5.",
                    "options": ["x ∈ {-8, -4, -2, 2}", "x ∈ {-4, -2}", "x ∈ {-2, 2}", "x ∈ {1, 5}"],
                    "correctAnswer": "x ∈ {-8, -4, -2, 2}",
                    "explanation": "Để (x + 3) là ước của 5 thì (x + 3) ∈ {1, -1, 5, -5}. Giải ra ta được: x ∈ {-2, -4, 2, -8}."
                },
                {
                    "id": "q17_hard_2",
                    "type": "multiple-choice",
                    "question": "Có bao nhiêu số nguyên x thỏa mãn: (x - 2) là bội của (x + 1)?",
                    "options": ["4", "2", "6", "0"],
                    "correctAnswer": "4",
                    "explanation": "Ta biến đổi: x - 2 = (x + 1) - 3. Để (x - 2) chia hết cho (x + 1) thì 3 phải chia hết cho (x + 1), tức là (x + 1) ∈ {1, -1, 3, -3}. Tìm được x ∈ {0, -2, 2, -4}. Vậy có 4 số."
                }
            ]
        }
    },
    "bai-18-hinh-tam-giac-deu-hinh-vuong-hinh-luc-giac-deu": {
        "description": "Đặc điểm hình học về cạnh, góc và đường chéo của tam giác đều, hình vuông và lục giác đều.",
        "theory": {
            "explanation": "Tam giác đều: Có 3 cạnh bằng nhau, 3 góc bằng nhau và mỗi góc bằng 60°. Hình vuông: Có 4 cạnh bằng nhau, 4 góc vuông (90°), 2 đường chéo bằng nhau. Hình lục giác đều: Có 6 cạnh bằng nhau, 6 góc bằng nhau, 3 đường chéo chính bằng nhau.",
            "visualizerType": None,
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q18_easy_1",
                    "type": "multiple-choice",
                    "question": "Mỗi góc của hình tam giác đều có số đo bằng bao nhiêu?",
                    "options": ["60°", "90°", "45°", "120°"],
                    "correctAnswer": "60°",
                    "explanation": "Tam giác đều có 3 góc bằng nhau và tổng số đo là 180°, nên mỗi góc bằng 180° / 3 = 60°."
                },
                {
                    "id": "q18_easy_2",
                    "type": "multiple-choice",
                    "question": "Hình vuông có bao nhiêu đường chéo bằng nhau?",
                    "options": ["2", "4", "3", "1"],
                    "correctAnswer": "2",
                    "explanation": "Hình vuông có hai đường chéo nối các đỉnh đối diện và chúng có độ dài bằng nhau."
                }
            ],
            "medium": [
                {
                    "id": "q18_med_1",
                    "type": "multiple-choice",
                    "question": "Phát biểu nào sau đây ĐÚNG về lục giác đều?",
                    "options": ["Có 6 cạnh bằng nhau và 3 đường chéo chính bằng nhau", "Có 6 cạnh bằng nhau và 6 đường chéo chính bằng nhau", "Có 5 cạnh bằng nhau và 5 góc bằng nhau", "Có 6 góc bằng nhau và mỗi góc bằng 90°"],
                    "correctAnswer": "Có 6 cạnh bằng nhau và 3 đường chéo chính bằng nhau",
                    "explanation": "Lục giác đều có 6 cạnh bằng nhau và có 3 đường chéo chính nối các đỉnh đối diện tương ứng bằng nhau."
                },
                {
                    "id": "q18_med_2",
                    "type": "multiple-choice",
                    "question": "Một hình tam giác đều có chu vi là 15 cm. Độ dài mỗi cạnh của tam giác đó là:",
                    "options": ["5 cm", "3 cm", "4 cm", "15 cm"],
                    "correctAnswer": "5 cm",
                    "explanation": "Tam giác đều có 3 cạnh bằng nhau, độ dài mỗi cạnh là: 15 / 3 = 5 cm."
                }
            ],
            "hard": [
                {
                    "id": "q18_hard_1",
                    "type": "multiple-choice",
                    "question": "Cho hình vuông ABCD. Biết đường chéo AC = 6 cm. Độ dài đường chéo BD là:",
                    "options": ["6 cm", "3 cm", "12 cm", "Không xác định được"],
                    "correctAnswer": "6 cm",
                    "explanation": "Trong hình vuông, hai đường chéo bằng nhau nên BD = AC = 6 cm."
                },
                {
                    "id": "q18_hard_2",
                    "type": "multiple-choice",
                    "question": "Người ta ghép 6 hình tam giác đều có cạnh 4 cm thành một hình lục giác đều. Chu vi của hình lục giác đều đó là bao nhiêu?",
                    "options": ["24 cm", "36 cm", "18 cm", "12 cm"],
                    "correctAnswer": "24 cm",
                    "explanation": "Ghép 6 tam giác đều cạnh 4 cm quanh một điểm chung thì hình lục giác đều tạo thành có cạnh dài 4 cm. Chu vi lục giác đều là 6 * 4 = 24 cm."
                }
            ]
        }
    },
    "bai-19-hinh-chu-nhat-hinh-thoi-hinh-binh-hanh-hinh-thang-can": {
        "description": "Nhận biết các đặc trưng về cạnh, góc và đường chéo của hình chữ nhật, hình thoi, hình bình hành và hình thang cân.",
        "theory": {
            "explanation": "Hình chữ nhật: Có 4 góc vuông, các cạnh đối song song và bằng nhau, hai đường chéo bằng nhau. Hình thoi: Có 4 cạnh bằng nhau, các cạnh đối song song, hai đường chéo vuông góc với nhau tại trung điểm mỗi đường. Hình bình hành: Các cạnh đối song song và bằng nhau, các góc đối bằng nhau. Hình thang cân: Hai cạnh đáy song song, hai cạnh bên bằng nhau, hai đường chéo bằng nhau.",
            "visualizerType": None,
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q19_easy_1",
                    "type": "multiple-choice",
                    "question": "Hai đường chéo của hình thoi có tính chất nào sau đây?",
                    "options": ["Vuông góc với nhau", "Bằng nhau", "Song song với nhau", "Không cắt nhau"],
                    "correctAnswer": "Vuông góc với nhau",
                    "explanation": "Hai đường chéo của hình thoi vuông góc với nhau tại trung điểm của mỗi đường."
                },
                {
                    "id": "q19_easy_2",
                    "type": "multiple-choice",
                    "question": "Hình thang cân có đặc điểm nào dưới đây?",
                    "options": ["Hai đường chéo bằng nhau", "Bốn cạnh bằng nhau", "Bốn góc vuông", "Hai đường chéo vuông góc"],
                    "correctAnswer": "Hai đường chéo bằng nhau",
                    "explanation": "Hình thang cân có hai cạnh đáy song song, hai cạnh bên bằng nhau và hai đường chéo bằng nhau."
                }
            ],
            "medium": [
                {
                    "id": "q19_med_1",
                    "type": "multiple-choice",
                    "question": "Trong các khẳng định sau, khẳng định nào SAI?",
                    "options": ["Hình bình hành có hai đường chéo bằng nhau", "Hình chữ nhật có hai đường chéo bằng nhau", "Hình thoi có bốn cạnh bằng nhau", "Hình bình hành có các cạnh đối bằng nhau"],
                    "correctAnswer": "Hình bình hành có hai đường chéo bằng nhau",
                    "explanation": "Hình bình hành nói chung không có hai đường chéo bằng nhau. Hai đường chéo bằng nhau là tính chất của hình chữ nhật, hình vuông, hình thang cân."
                },
                {
                    "id": "q19_med_2",
                    "type": "multiple-choice",
                    "question": "Cho hình bình hành ABCD. Biết AB = 5 cm, BC = 3 cm. Độ dài cạnh CD và AD lần lượt là:",
                    "options": ["CD = 5 cm, AD = 3 cm", "CD = 3 cm, AD = 5 cm", "CD = 5 cm, AD = 5 cm", "CD = 3 cm, AD = 3 cm"],
                    "correctAnswer": "CD = 5 cm, AD = 3 cm",
                    "explanation": "Trong hình bình hành, các cạnh đối diện bằng nhau nên CD = AB = 5 cm, và AD = BC = 3 cm."
                }
            ],
            "hard": [
                {
                    "id": "q19_hard_1",
                    "type": "multiple-choice",
                    "question": "Trong các hình đã học, hình nào luôn có hai đường chéo vừa bằng nhau vừa vuông góc với nhau?",
                    "options": ["Hình vuông", "Hình chữ nhật", "Hình thoi", "Hình bình hành"],
                    "correctAnswer": "Hình vuông",
                    "explanation": "Hình vuông có hai đường chéo bằng nhau (tính chất hình chữ nhật) và vuông góc với nhau (tính chất hình thoi)."
                },
                {
                    "id": "q19_hard_2",
                    "type": "multiple-choice",
                    "question": "Cho hình thang cân ABCD (AB // CD) có đáy AB = 4 cm, CD = 8 cm và đường chéo AC = 7 cm. Độ dài đường chéo BD là:",
                    "options": ["7 cm", "4 cm", "8 cm", "11 cm"],
                    "correctAnswer": "7 cm",
                    "explanation": "Trong hình thang cân, hai đường chéo có độ dài bằng nhau nên BD = AC = 7 cm."
                }
            ]
        }
    },
    "bai-20-chu-vi-va-dien-tich-cua-mot-so-tu-giac-da-hoc": {
        "description": "Các công thức tính chu vi và diện tích hình vuông, hình chữ nhật, hình thoi, hình bình hành, hình thang.",
        "theory": {
            "explanation": "Hình chữ nhật: P = 2 * (a + b); S = a * b. Hình vuông: P = 4 * a; S = a^2. Hình bình hành: S = a * h (cạnh đáy nhân chiều cao tương ứng). Hình thoi: S = (1/2) * d1 * d2 (nửa tích hai đường chéo). Hình thang: S = (1/2) * (a + b) * h (nửa tích tổng hai đáy với chiều cao).",
            "visualizerType": None,
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q20_easy_1",
                    "type": "multiple-choice",
                    "question": "Công thức tính diện tích hình thoi có độ dài hai đường chéo d1 và d2 là:",
                    "options": ["S = (1/2) * d1 * d2", "S = d1 * d2", "S = 2 * (d1 + d2)", "S = (d1 * d2)^2"],
                    "correctAnswer": "S = (1/2) * d1 * d2",
                    "explanation": "Diện tích hình thoi bằng nửa tích độ dài hai đường chéo của nó."
                },
                {
                    "id": "q20_easy_2",
                    "type": "multiple-choice",
                    "question": "Một mảnh vườn hình chữ nhật có chiều dài 15 m, chiều rộng 10 m. Diện tích mảnh vườn đó là:",
                    "options": ["150 m^2", "50 m^2", "25 m^2", "300 m^2"],
                    "correctAnswer": "150 m^2",
                    "explanation": "Diện tích hình chữ nhật là: S = dài * rộng = 15 * 10 = 150 m^2."
                }
            ],
            "medium": [
                {
                    "id": "q20_med_1",
                    "type": "multiple-choice",
                    "question": "Một hình thang có độ dài hai đáy lần lượt là 6 cm và 10 cm, chiều cao là 5 cm. Diện tích hình thang đó là:",
                    "options": ["40 cm^2", "80 cm^2", "30 cm^2", "50 cm^2"],
                    "correctAnswer": "40 cm^2",
                    "explanation": "Diện tích hình thang: S = (1/2) * (đáy lớn + đáy nhỏ) * chiều cao = (1/2) * (6 + 10) * 5 = 40 cm^2."
                },
                {
                    "id": "q20_med_2",
                    "type": "multiple-choice",
                    "question": "Một hình bình hành có diện tích bằng 48 cm^2 and độ dài một cạnh đáy là 8 cm. Chiều cao tương ứng của hình bình hành đó là:",
                    "options": ["6 cm", "8 cm", "12 cm", "4 cm"],
                    "correctAnswer": "6 cm",
                    "explanation": "Diện tích hình bình hành: S = đáy * chiều cao => chiều cao = S / đáy = 48 / 8 = 6 cm."
                }
            ],
            "hard": [
                {
                    "id": "q20_hard_1",
                    "type": "multiple-choice",
                    "question": "Một hình thoi có chu vi là 20 cm và diện tích là 24 cm^2. Chiều cao tương ứng với một cạnh của hình thoi đó là bao nhiêu?",
                    "options": ["4.8 cm", "5 cm", "4 cm", "6 cm"],
                    "correctAnswer": "4.8 cm",
                    "explanation": "Hình thoi có 4 cạnh bằng nhau, chu vi bằng 20 cm nên độ dài mỗi cạnh là 20 / 4 = 5 cm. Vì hình thoi cũng là hình bình hành nên S = cạnh * chiều cao => chiều cao = S / cạnh = 24 / 5 = 4.8 cm."
                },
                {
                    "id": "q20_hard_2",
                    "type": "multiple-choice",
                    "question": "Người ta làm một khung tranh bằng gỗ có dạng hình thang cân với đáy nhỏ 30 cm, đáy lớn 50 cm, chiều cao 40 cm. Giá tiền mỗi mét vuông gỗ làm tranh là 200.000 đồng. Chi phí gỗ để làm bức tranh đó là bao nhiêu?",
                    "options": ["32.000 đồng", "16.000 đồng", "160.000 đồng", "320.000 đồng"],
                    "correctAnswer": "32.000 đồng",
                    "explanation": "Diện tích hình thang cân: S = (1/2) * (30 + 50) * 40 = 1600 cm^2. Đổi 1600 cm^2 = 0.16 m^2. Chi phí gỗ: 0.16 * 200.000 = 32.000 đồng."
                }
            ]
        }
    },
    "bai-22-hinh-co-tam-doi-xung": {
        "description": "Nhận biết hình có tâm đối xứng và xác định tâm đối xứng của các hình hình học cơ bản.",
        "theory": {
            "explanation": "Một hình được gọi là hình có tâm đối xứng nếu có một điểm O sao cho khi ta quay hình đó nửa vòng (180°) quanh điểm O thì hình đó trùng khít với chính nó ở vị trí ban đầu. Điểm O được gọi là tâm đối xứng của hình. Ví dụ: Đường tròn (tâm đường tròn là tâm đối xứng), các hình bình hành, chữ nhật, thoi, vuông (giao điểm hai đường chéo là tâm đối xứng), hình lục giác đều (giao điểm các đường chéo chính là tâm đối xứng). Tam giác đều không có tâm đối xứng.",
            "visualizerType": "SymmetryLab",
            "visualizerConfig": {}
        },
        "exercises": {
            "easy": [
                {
                    "id": "q22_easy_1",
                    "type": "multiple-choice",
                    "question": "Hình nào sau đây KHÔNG có tâm đối xứng?",
                    "options": ["Hình tam giác đều", "Hình tròn", "Hình vuông", "Hình chữ nhật"],
                    "correctAnswer": "Hình tam giác đều",
                    "explanation": "Hình tam giác đều không có tâm đối xứng. Các hình tròn, vuông, chữ nhật đều có tâm đối xứng."
                },
                {
                    "id": "q22_easy_2",
                    "type": "multiple-choice",
                    "question": "Tâm đối xứng của hình tròn là điểm nào?",
                    "options": ["Tâm của hình tròn", "Điểm bất kỳ trên đường tròn", "Điểm bất kỳ nằm ngoài hình tròn", "Hình tròn không có tâm đối xứng"],
                    "correctAnswer": "Tâm của hình tròn",
                    "explanation": "Nếu quay hình tròn 180° quanh tâm của nó thì hình tròn vẫn trùng khít với vị trí ban đầu. Vậy tâm đối xứng là tâm hình tròn."
                }
            ],
            "medium": [
                {
                    "id": "q22_med_1",
                    "type": "multiple-choice",
                    "question": "Tâm đối xứng của hình bình hành là:",
                    "options": ["Giao điểm của hai đường chéo", "Trung điểm của một cạnh", "Một trong các đỉnh", "Hình bình hành không có tâm đối xứng"],
                    "correctAnswer": "Giao điểm của hai đường chéo",
                    "explanation": "Đối với hình bình hành (và cả hình chữ nhật, hình thoi, hình vuông), tâm đối xứng chính là giao điểm của hai đường chéo."
                },
                {
                    "id": "q22_med_2",
                    "type": "multiple-choice",
                    "question": "Trong các chữ cái in hoa sau: H, I, N, A. Chữ cái nào KHÔNG có tâm đối xứng?",
                    "options": ["Chữ A", "Chữ H", "Chữ I", "Chữ N"],
                    "correctAnswer": "Chữ A",
                    "explanation": "Chữ A chỉ có trục đối xứng thẳng đứng chứ không có tâm đối xứng. Chữ H, I, N đều có tâm đối xứng (khi xoay 180° vẫn giữ nguyên hình dạng)."
                }
            ],
            "hard": [
                {
                    "id": "q22_hard_1",
                    "type": "multiple-choice",
                    "question": "Hình lục giác đều có bao nhiêu tâm đối xứng?",
                    "options": ["1 tâm đối xứng", "6 tâm đối xứng", "3 tâm đối xứng", "Không có tâm đối xứng"],
                    "correctAnswer": "1 tâm đối xứng",
                    "explanation": "Mỗi hình phẳng (nếu có tâm đối xứng) chỉ có duy nhất 1 tâm đối xứng. Với lục giác đều, đó là giao điểm của 3 đường chéo chính."
                },
                {
                    "id": "q22_hard_2",
                    "type": "multiple-choice",
                    "question": "Trong các hình: Hình chữ nhật, hình thang cân, hình thoi, hình lục giác đều. Có bao nhiêu hình có tâm đối xứng?",
                    "options": ["3 hình", "4 hình", "2 hình", "1 hình"],
                    "correctAnswer": "3 hình",
                    "explanation": "Hình chữ nhật, hình thoi, hình lục giác đều có tâm đối xứng. Hình thang cân nói chung không có tâm đối xứng. Vậy có tất cả 3 hình."
                }
            ]
        }
    }
}

def main():
    json_path = os.path.join("public", "lessons.json")
    if not os.path.exists(json_path):
        # Try parent directory if running from inside src or another path
        json_path = os.path.join("math6-app", "public", "lessons.json")
        if not os.path.exists(json_path):
            json_path = "lessons.json"
            
    print(f"Reading original file from: {json_path}")
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    updated_count = 0
    for chapter in data.get("chapters", []):
        for lesson in chapter.get("lessons", []):
            lesson_id = lesson.get("id")
            if lesson_id in LESSONS_DATA:
                new_info = LESSONS_DATA[lesson_id]
                lesson["description"] = new_info["description"]
                lesson["theory"] = new_info["theory"]
                lesson["exercises"] = new_info["exercises"]
                # Remove placeholder status
                if "isPlaceholder" in lesson:
                    del lesson["isPlaceholder"]
                updated_count += 1
                
    print(f"Updated {updated_count} lessons/sections.")
    
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Successfully wrote the updated file back to: {json_path}")

if __name__ == "__main__":
    main()
