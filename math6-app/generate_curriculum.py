import json
import os

def get_options(correct, wrong1, wrong2, wrong3):
    return [correct, wrong1, wrong2, wrong3]

def make_q(q_id, question, correct, wrong1, wrong2, wrong3, explanation):
    return {
        "id": q_id,
        "type": "multiple-choice",
        "question": question,
        "options": get_options(correct, wrong1, wrong2, wrong3),
        "correctAnswer": correct,
        "explanation": explanation
    }

def get_lesson_data(lid):
    # 1. bai-3-thu-tu-trong-tap-hop-cac-so-tu-nhien
    if lid == "bai-3-thu-tu-trong-tap-hop-cac-so-tu-nhien":
        desc = "So sánh các số tự nhiên, biểu diễn số tự nhiên trên tia số và hiểu các ký hiệu lớn hơn hoặc bằng, nhỏ hơn hoặc bằng."
        theory = "Hãy tưởng tượng các số tự nhiên giống như các toa của một đoàn tàu hỏa siêu dài, xếp hàng lần lượt từ số 0, 1, 2, 3... Toa đứng sau luôn chở nhiều hàng hơn và lớn hơn toa đứng trước. Trên tia số nằm ngang, số nhỏ hơn sẽ nằm bên trái, số lớn hơn nằm bên phải. Ký hiệu ≤ nghĩa là 'nhỏ hơn hoặc bằng' (có thể nhỏ hơn hoặc bằng luôn), còn ≥ là 'lớn hơn hoặc bằng'. Ví dụ: tuổi x của con dưới 11 tuổi có nghĩa là x ≤ 10, x có thể là các số từ 0 đến 10!"
        
        easy = []
        for i in range(10):
            a = 1200 + i * 5
            b = 1200 + i * 5 + (3 if i % 2 == 0 else -3)
            op = "<" if a < b else ">"
            easy.append(make_q(
                f"q3_easy_{i+1}",
                f"Điền dấu so sánh thích hợp vào chỗ trống: {a} ___ {b}.",
                f"{a} {op} {b}",
                f"{a} = {b}",
                f"{a} {'>' if op == '<' else '<'} {b}",
                "Không so sánh được",
                f"So sánh các hàng từ trái qua phải: hàng chục hoặc hàng đơn vị của {max(a, b)} lớn hơn {min(a, b)} nên {a} {op} {b}."
            ))
            
        med = []
        for i in range(10):
            start = 5 + i
            end = 8 + i
            med.append(make_q(
                f"q3_med_{i+1}",
                f"Tìm tập hợp các số tự nhiên x sao cho {start} < x ≤ {end}.",
                "{" + ", ".join(str(x) for x in range(start + 1, end + 1)) + "}",
                "{" + ", ".join(str(x) for x in range(start, end)) + "}",
                "{" + ", ".join(str(x) for x in range(start, end + 1)) + "}",
                "{" + ", ".join(str(x) for x in range(start + 1, end)) + "}",
                f"x là số tự nhiên lớn hơn {start} và nhỏ hơn hoặc bằng {end}, do đó x nhận các giá trị từ {start + 1} đến {end}."
            ))
            
        hard = []
        for i in range(10):
            val = 15 + i
            num_elements = val - 10
            hard.append(make_q(
                f"q3_hard_{i+1}",
                f"Cho tập hợp A = {{x ∈ N | 10 ≤ x < {val}}}. Tập hợp A có bao nhiêu phần tử?",
                f"{num_elements} phần tử",
                f"{num_elements + 1} phần tử",
                f"{num_elements - 1} phần tử",
                f"{val} phần tử",
                f"Các phần tử của A là các số tự nhiên từ 10 đến {val - 1}. Số lượng phần tử là {val} - 10 = {num_elements} phần tử."
            ))
        return desc, theory, easy, med, hard

    # 2. bai-4-phep-cong-va-phep-tru-so-tu-nhien
    elif lid == "bai-4-phep-cong-va-phep-tru-so-tu-nhien":
        desc = "Thực hiện phép cộng và phép trừ các số tự nhiên, áp dụng các tính chất giao hoán và kết hợp để tính nhanh."
        theory = "Cộng và trừ giống như việc con xếp thêm đồ chơi vào giỏ hoặc lấy bớt ra vậy. Phép cộng có tính chất giao hoán (đổi chỗ: a + b = b + a) và kết hợp (nhóm lại: (a + b) + c = a + (b + c)). Con hãy tìm những cặp số có tổng tròn chục, tròn trăm (như 24 + 76 = 100) để nhóm lại với nhau, giúp việc tính nhẩm nhanh như chớp nhé!"
        
        easy = []
        for i in range(10):
            a = 15 + i * 5
            x = 30 + i * 2
            ans = x - a
            easy.append(make_q(
                f"q4_easy_{i+1}",
                f"Tìm số tự nhiên x thỏa mãn: x + {a} = {x}.",
                f"{ans}",
                f"{ans + 5}",
                f"{ans - 5}",
                f"{x + a}",
                f"Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết: x = {x} - {a} = {ans}."
            ))
            
        med = []
        for i in range(10):
            a = 12 + i
            b = 85
            c = 88 - i
            total = a + b + c
            med.append(make_q(
                f"q4_med_{i+1}",
                f"Tính nhanh tổng sau: {a} + {b} + {c}.",
                f"{total}",
                f"{total + 10}",
                f"{total - 10}",
                f"{total + 5}",
                f"Áp dụng tính chất giao hoán và kết hợp: ({a} + {c}) + {b} = {a+c} + {b} = {total}."
            ))
            
        hard = []
        for i in range(10):
            a = 100 - i
            b = 50 + i
            c = 200 + i * 5
            ans = c - b + a
            hard.append(make_q(
                f"q4_hard_{i+1}",
                f"Tìm số tự nhiên x biết: (x - {a}) + {b} = {c}.",
                f"{ans}",
                f"{ans - 10}",
                f"{ans + 10}",
                f"{c - b - a}",
                f"Ta có: x - {a} = {c} - {b} = {c - b}. Do đó x = {c - b} + {a} = {ans}."
            ))
        return desc, theory, easy, med, hard

    # 3. bai-5-phep-nhan-va-phep-chia-so-tu-nhien
    elif lid == "bai-5-phep-nhan-va-phep-chia-so-tu-nhien":
        desc = "Thực hiện phép nhân, phép chia hết và phép chia có dư; áp dụng tính chất phân phối để tính nhẩm nhanh."
        theory = "Phép nhân giống như phép cộng lặp lại nhiều lần. Ví dụ, nếu con có 4 hộp kẹo, mỗi hộp có 5 viên, thay vì cộng 5 + 5 + 5 + 5, con hãy viết 5 × 4 = 20 viên kẹo. Phép chia là chia đều cho các bạn. Nếu chia không hết, phần dư lại gọi là số dư, số dư này lúc nào cũng phải bé hơn số chia đấy nhé! Công thức thần kỳ: Số bị chia = Số chia × Thương + Số dư."
        
        easy = []
        for i in range(10):
            sbc = 40 + i * 3
            sc = 6
            q = sbc // sc
            r = sbc % sc
            easy.append(make_q(
                f"q5_easy_{i+1}",
                f"Phép chia {sbc} cho {sc} có thương và số dư lần lượt là:",
                f"Thương là {q}, dư {r}",
                f"Thương là {q}, dư {r+1}",
                f"Thương là {q-1}, dư {r+sc}",
                f"Thương là {q+1}, dư {r}",
                f"Ta có: {sbc} = {sc} * {q} + {r}. Vì số dư {r} < {sc} nên thương là {q} và số dư là {r}."
            ))
            
        med = []
        for i in range(10):
            a = 15 + i * 2
            ans = a * 99
            med.append(make_q(
                f"q5_med_{i+1}",
                f"Tính nhẩm nhanh bằng tính chất phân phối: {a} * 99.",
                f"{ans}",
                f"{ans + a}",
                f"{ans - a}",
                f"{a * 100}",
                f"Áp dụng tính chất phân phối: {a} * 99 = {a} * (100 - 1) = {a} * 100 - {a} = {a*100} - {a} = {ans}."
            ))
            
        hard = []
        for i in range(10):
            sc = 12 + i
            q = 8 + i
            r = sc - 1
            sbc = sc * q + r
            hard.append(make_q(
                f"q5_hard_{i+1}",
                f"Trong một phép chia có dư, số chia là {sc}, thương là {q} và số dư là số dư lớn nhất có thể. Tìm số bị chia.",
                f"{sbc}",
                f"{sbc - 1}",
                f"{sbc + 1}",
                f"{sc * q}",
                f"Vì số chia là {sc} nên số dư lớn nhất có thể là {r}. Số bị chia là: {sc} * {q} + {r} = {sbc}."
            ))
        return desc, theory, easy, med, hard

    # 4. bai-6-luy-thua-voi-so-mu-tu-nhien
    elif lid == "bai-6-luy-thua-voi-so-mu-tu-nhien":
        desc = "Lũy thừa bậc n của một số, nhân và chia hai lũy thừa cùng cơ số."
        theory = "Lũy thừa là cách viết siêu gọn khi con nhân nhiều số giống hệt nhau nhiều lần. Giống như một tòa tháp chung cư: số ở dưới đất gọi là cơ số (chủ nhà), số nhỏ ở trên lầu gọi là số mũ (tầng lầu). Ví dụ: 2 × 2 × 2 được viết gọn là 2³ (2 mũ 3). Khi nhân hai lũy thừa cùng cơ số, con chỉ cần giữ nguyên cơ số và cộng các số mũ lại với nhau!"
        
        easy = []
        for i in range(10):
            base = 2 + (i % 4)
            exp = 3 + (i // 4)
            easy.append(make_q(
                f"q6_easy_{i+1}",
                f"Trong lũy thừa {base}^{exp}, cơ số và số mũ lần lượt là:",
                f"Cơ số là {base}, số mũ là {exp}",
                f"Cơ số là {exp}, số mũ là {base}",
                f"Cơ số là {base}, số mũ là {base*exp}",
                f"Cơ số là {base*exp}, số mũ là {exp}",
                f"Ở lũy thừa x^y, số đứng dưới x là cơ số và số đứng trên y là số mũ. Vậy cơ số là {base}, số mũ là {exp}."
            ))
            
        med = []
        for i in range(10):
            base = 2 + (i % 3)
            m = 2 + (i // 3)
            n = 3
            ans_exp = m + n
            med.append(make_q(
                f"q6_med_{i+1}",
                f"Tính tích của hai lũy thừa cùng cơ số: {base}^{m} * {base}^{n}.",
                f"{base}^{ans_exp}",
                f"{base}^{m*n}",
                f"{base * 2}^{ans_exp}",
                f"{base}^{m-n}",
                f"Khi nhân hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và cộng các số mũ: {base}^{m} * {base}^{n} = {base}^({m}+{n}) = {base}^{ans_exp}."
            ))
            
        hard = []
        for i in range(10):
            base = 2 if i % 2 == 0 else 3
            exp = 4 + (i // 2)
            val = base ** exp
            hard.append(make_q(
                f"q6_hard_{i+1}",
                f"Tìm số tự nhiên x biết rằng: {base}^x = {val}.",
                f"{exp}",
                f"{exp - 1}",
                f"{exp + 1}",
                f"{val // base}",
                f"Ta có {val} = {base}^{exp} (tích của {exp} thừa số {base}). Do đó x = {exp}."
            ))
        return desc, theory, easy, med, hard

    # 5. bai-7-thu-tu-thuc-hien-cac-phep-tinh
    elif lid == "bai-7-thu-tu-thuc-hien-cac-phep-tinh":
        desc = "Quy tắc thứ tự thực hiện các phép tính đối với biểu thức có hoặc không có dấu ngoặc."
        theory = "Quy tắc thứ tự thực hiện phép tính giống như luật ưu tiên khi tham gia giao thông. Nếu không có ngoặc, thứ tự ưu tiên là: Lũy thừa (mũ) làm trước tiên -> Nhân và chia -> Cộng và trừ. Nếu có dấu ngoặc, con phải thực hiện trong ngoặc tròn () trước, rồi đến ngoặc vuông [], và cuối cùng là ngoặc nhọn {} nhé!"
        
        easy = []
        for i in range(10):
            a = 15 + i
            b = 2
            c = 3
            ans = a - b * c
            easy.append(make_q(
                f"q7_easy_{i+1}",
                f"Tính giá trị của biểu thức: {a} - {b} * {c}.",
                f"{ans}",
                f"{(a - b) * c}",
                f"{ans + 5}",
                f"{ans - 5}",
                f"Thực hiện phép nhân trước: {b} * {c} = {b*c}. Sau đó thực hiện phép trừ: {a} - {b*c} = {ans}."
            ))
            
        med = []
        for i in range(10):
            base = 2 + (i % 2)
            exp = 3
            a = 10 + i
            b = 4
            val_pow = base ** exp
            ans = val_pow * a - b
            med.append(make_q(
                f"q7_med_{i+1}",
                f"Tính giá trị biểu thức: {base}^{exp} * {a} - {b}.",
                f"{ans}",
                f"{base ** exp * (a - b)}",
                f"{ans + 10}",
                f"{ans - 10}",
                f"Lũy thừa trước: {base}^{exp} = {val_pow}. Nhân tiếp theo: {val_pow} * {a} = {val_pow * a}. Trừ cuối cùng: {val_pow * a} - {b} = {ans}."
            ))
            
        hard = []
        for i in range(10):
            x_val = 5 + i
            a = 3
            b = 2
            c = 4
            rhs = a * (x_val - b) + c
            hard.append(make_q(
                f"q7_hard_{i+1}",
                f"Tìm số tự nhiên x biết: {a} * (x - {b}) + {c} = {rhs}.",
                f"{x_val}",
                f"{x_val + 1}",
                f"{x_val - 1}",
                f"{rhs - c - a + b}",
                f"Ta có: {a} * (x - {b}) = {rhs} - {c} = {rhs - c}. Suy ra x - {b} = {rhs - c} / {a} = {x_val - b}. Vậy x = {x_val - b} + {b} = {x_val}."
            ))
        return desc, theory, easy, med, hard

    # 6. bai-8-quan-he-chia-het-va-tinh-chat
    elif lid == "bai-8-quan-he-chia-het-va-tinh-chat":
        desc = "Khái niệm chia hết, ước và bội, cùng tính chất chia hết của một tổng."
        theory = "Chia hết giống như con chia đều một giỏ táo cho các bạn mà không còn dư quả nào. Nếu số a chia hết cho số b (b khác 0), ta ký hiệu là a ⋮ b. Lúc này, a được gọi là bội của b, và b được gọi là ước của a. Tính chất tổng chia hết: Nếu mỗi số hạng của một tổng đều chia hết cho cùng một số thì tổng đó chắc chắn chia hết cho số đó!"
        
        easy = []
        for i in range(10):
            mul = 3 + i
            a = 5 * mul
            easy.append(make_q(
                f"q8_easy_{i+1}",
                f"Trong các khẳng định sau, khẳng định nào ĐÚNG?",
                f"{a} là bội của 5",
                f"5 là bội của {a}",
                f"{a} là ước của 5",
                f"5 chia hết cho {a}",
                f"Vì {a} chia hết cho 5 ({a} = 5 * {mul}) nên {a} là bội của 5 và 5 là ước của {a}."
            ))
            
        med = []
        for i in range(10):
            a = 6 * (2 + i)
            b = 6 * (3 + i)
            med.append(make_q(
                f"q8_med_{i+1}",
                f"Nếu a chia hết cho 6 và b chia hết cho 6 thì tổng (a + b) chắc chắn chia hết cho số nào dưới đây?",
                "6",
                "12",
                "18",
                "36",
                "Theo tính chất chia hết của một tổng, nếu tất cả các số hạng đều chia hết cho 6 thì tổng (a + b) cũng chia hết cho 6."
            ))
            
        hard = []
        for i in range(10):
            val = 4 + i
            divs = [d for d in range(1, val + 1) if val % d == 0]
            ans_str = "x ∈ {" + ", ".join(str(d) for d in divs) + "}"
            hard.append(make_q(
                f"q8_hard_{i+1}",
                f"Tìm tất cả các số tự nhiên x sao cho (x + {val}) chia hết cho x.",
                ans_str,
                "x ∈ {" + ", ".join(str(d) for d in divs[:-1]) + "}",
                "x ∈ {1, " + str(val) + "}",
                "x ∈ {" + ", ".join(str(d+1) for d in divs) + "}",
                f"Vì x chia hết cho x, để (x + {val}) chia hết cho x thì {val} phải chia hết cho x. Do đó, x là ước của {val}. Ước tự nhiên của {val} là: {divs}."
            ))
        return desc, theory, easy, med, hard

    # 7. bai-9-dau-hieu-chia-het
    elif lid == "bai-9-dau-hieu-chia-het":
        desc = "Nhận biết các số chia hết cho 2, 5, 3 và 9 dựa trên chữ số tận cùng và tổng các chữ số."
        theory = "Dấu hiệu chia hết giống như những chiếc chìa khóa vạn năng giúp con mở kho báu toán học cực nhanh mà không cần đặt phép chia! Chìa khóa 2 và 5 nằm ở chữ số tận cùng (chẵn thì chia hết cho 2; tận cùng là 0 hoặc 5 thì chia hết cho 5). Chìa khóa 3 và 9 nằm ở tổng các chữ số (cộng tất cả các chữ số lại, nếu tổng chia hết cho 3 hoặc 9 thì số đó chia hết cho 3 hoặc 9)!"
        
        easy = []
        for i in range(10):
            base = 120 + i * 10
            ans = base
            wrong1 = base + 3
            wrong2 = base + 7
            wrong3 = base + 9
            easy.append(make_q(
                f"q9_easy_{i+1}",
                f"Trong các số sau: {ans}, {wrong1}, {wrong2}, {wrong3}, số nào chia hết cho cả 2 và 5?",
                f"{ans}",
                f"{wrong1}",
                f"{wrong2}",
                f"{wrong3}",
                "Số chia hết cho cả 2 và 5 phải có chữ số tận cùng là 0. Trong các số trên, chỉ có số kết thúc bằng 0 chia hết cho cả 2 và 5."
            ))
            
        med = []
        for i in range(10):
            val = 3 + i
            digit_sum = 3 + 5
            x_choices = [x for x in range(10) if (digit_sum + x) % 3 == 0]
            ans_str = "x ∈ {" + ", ".join(str(x) for x in x_choices) + "}"
            med.append(make_q(
                f"q9_med_{i+1}",
                f"Tìm các chữ số x sao cho số 35x chia hết cho 3.",
                ans_str,
                "x ∈ {1, 5}",
                "x ∈ {0, 3, 6, 9}",
                "x ∈ {2, 5, 8}",
                f"Tổng các chữ số của 35x là 3 + 5 + x = 8 + x. Để 35x chia hết cho 3 thì (8 + x) phải chia hết cho 3. Suy ra x nhận các giá trị: {x_choices}."
            ))
            
        hard = []
        for i in range(10):
            a = 1 + (i % 3)
            b = 2 + (i // 3)
            y_val = 0
            x_val = (9 - (a + b)) % 9
            hard.append(make_q(
                f"q9_hard_{i+1}",
                f"Tìm các chữ số x và y để số {a}x{b}y chia hết cho cả 2, 5 và 9.",
                f"x = {x_val}, y = {y_val}",
                f"x = {x_val + 1}, y = {y_val}",
                f"x = {x_val}, y = 5",
                f"x = 9, y = {y_val}",
                f"Vì số chia hết cho cả 2 và 5 nên chữ số tận cùng y = {y_val}. Để số {a}x{b}0 chia hết cho 9 thì tổng các chữ số ({a} + x + {b}) = {a+b} + x phải chia hết cho 9. Suy ra x = {x_val}."
            ))
        return desc, theory, easy, med, hard

    # 8. bai-10-so-nguyen-to
    elif lid == "bai-10-so-nguyen-to":
        desc = "Tìm hiểu số nguyên tố, hợp số và phân tích một số ra thừa số nguyên tố."
        theory = "Số nguyên tố là những số 'cô đơn' và 'kiêu kỳ' nhất trên đời, bởi vì chúng lớn hơn 1 và chỉ chịu chia hết cho đúng hai số: là số 1 và chính nó mà thôi. Còn hợp số là những số 'hòa đồng' hơn, vì ngoài 1 và chính nó, chúng còn có thêm các ước khác nữa. Số 0 và số 1 không phải số nguyên tố, cũng chẳng phải hợp số đâu con nhé!"
        
        easy = []
        for i in range(10):
            primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
            p = primes[i]
            wrong1 = 4 + i * 2
            wrong2 = 9 + i
            if wrong2 in primes: wrong2 += 1
            if wrong1 in primes: wrong1 += 1
            easy.append(make_q(
                f"q10_easy_{i+1}",
                f"Số nào sau đây là số nguyên tố?",
                f"{p}",
                f"{wrong1}",
                f"{wrong2}",
                "1",
                f"Số {p} chỉ có hai ước tự nhiên là 1 và {p} nên là số nguyên tố. Các số còn lại có nhiều hơn hai ước hoặc là số 1."
            ))
            
        med = []
        for i in range(10):
            a = 1 + (i % 3)
            b = 1 + (i // 3)
            val = (2**a) * (3**b)
            ans = f"2^{a} * 3^{b}" if a > 1 else f"2 * 3^{b}"
            if b == 1:
                ans = f"2^{a} * 3" if a > 1 else "2 * 3"
            
            med.append(make_q(
                f"q10_med_{i+1}",
                f"Phân tích số {val} ra thừa số nguyên tố ta được kết quả:",
                ans,
                f"2 * {val//2}",
                f"3 * {val//3}",
                f"2^{a+1} * 3^{b-1}" if b > 1 else f"2^{a-1} * 3^{b+1}",
                f"Ta có {val} chia hết cho các thừa số nguyên tố 2 và 3. Phân tích ra thừa số nguyên tố là viết dưới dạng tích các lũy thừa của các số nguyên tố: {ans}."
            ))
            
        hard = []
        for i in range(10):
            p1 = 2 + i
            def is_p(n):
                return n > 1 and all(n % d != 0 for d in range(2, int(n**0.5)+1))
            while not is_p(p1): p1 += 1
            p2 = p1 + 1
            while not is_p(p2): p2 += 1
            prod = p1 * p2
            hard.append(make_q(
                f"q10_hard_{i+1}",
                f"Tích của hai số nguyên tố khác nhau là {p1} và {p2} là số gì?",
                "Hợp số",
                "Số nguyên tố",
                "Số lẻ",
                "Số nguyên tố chẵn",
                f"Tích {p1} * {p2} = {prod} chia hết cho 1, {p1}, {p2} và {prod}. Vì tích này có nhiều hơn 2 ước nên nó chắc chắn là hợp số."
            ))
        return desc, theory, easy, med, hard

    # 9. bai-11-uoc-chung-uoc-chung-lon-nhat
    elif lid == "bai-11-uoc-chung-uoc-chung-lon-nhat":
        desc = "Ước chung, ước chung lớn nhất và cách tìm bằng thừa số nguyên tố."
        theory = "Ước chung lớn nhất (ƯCLN) giống như chiếc kéo vạn năng lớn nhất giúp con cắt các thanh gỗ dài ngắn khác nhau thành các mảnh bằng nhau mà không thừa gỗ vụn. Để tìm ƯCLN: 1. Phân tích mỗi số ra thừa số nguyên tố. 2. Chọn ra các thừa số chung. 3. Nhân chúng lại với nhau với số mũ nhỏ nhất. Hai số có ƯCLN bằng 1 được gọi là hai số nguyên tố cùng nhau."
        
        easy = []
        for i in range(10):
            a = 6 + i
            b = 12 + i
            divs = [d for d in range(1, min(a,b)+1) if a % d == 0 and b % d == 0]
            ans_str = "{" + ", ".join(str(d) for d in divs) + "}"
            easy.append(make_q(
                f"q11_easy_{i+1}",
                f"Tìm tập hợp ước chung của hai số {a} và {b}.",
                ans_str,
                "{" + ", ".join(str(d) for d in divs[:-1]) + "}",
                "{" + str(divs[-1]) + "}",
                "{1}",
                f"Ước chung của {a} và {b} là những số tự nhiên mà cả {a} và {b} đều chia hết cho chúng. Tập hợp đó là {ans_str}."
            ))
            
        med = []
        for i in range(10):
            p1 = 2 + (i % 2)
            p2 = 3 + (i // 2)
            a = p1 * p2
            b = 25 if a % 5 != 0 else 7
            med.append(make_q(
                f"q11_med_{i+1}",
                f"Khẳng định nào sau đây đúng về hai số {a} và {b}?",
                f"{a} và {b} là hai số nguyên tố cùng nhau",
                f"{a} là ước của {b}",
                f"{b} là bội của {a}",
                f"ƯCLN({a}, {b}) = {p1}",
                f"Vì ƯCLN({a}, {b}) = 1 nên {a} và {b} là hai số nguyên tố cùng nhau."
            ))
            
        hard = []
        for i in range(10):
            nam = 20 + i * 2
            nu = 16 + i * 2
            import math
            gcd = math.gcd(nam, nu)
            hard.append(make_q(
                f"q11_hard_{i+1}",
                f"Một lớp học có {nam} nam và {nu} nữ. Cô giáo muốn chia lớp thành các nhóm sao cho số nam và số nữ ở mỗi nhóm đều bằng nhau. Hỏi cô giáo chia được nhiều nhất bao nhiêu nhóm?",
                f"{gcd} nhóm",
                f"{gcd + 2} nhóm",
                f"{gcd - 1} nhóm",
                "2 nhóm",
                f"Số nhóm nhiều nhất là ước chung lớn nhất của số nam và số nữ. ƯCLN({nam}, {nu}) = {gcd} nên chia được nhiều nhất {gcd} nhóm."
            ))
        return desc, theory, easy, med, hard

    # 10. bai-12-boi-chung-boi-chung-nho-nhat
    elif lid == "bai-12-boi-chung-boi-chung-nho-nhat":
        desc = "Bội chung, bội chung nhỏ nhất và phương pháp tìm bằng thừa số nguyên tố."
        theory = "Bội chung nhỏ nhất (BCNN) giống như một tiếng chuông báo thức chung cho hai chiếc đồng hồ có nhịp chuông khác nhau. BCNN của hai hay nhiều số là số nhỏ nhất khác 0 trong tập hợp các bội chung. Cách tìm BCNN: 1. Phân tích các số ra thừa số nguyên tố. 2. Chọn ra các thừa số chung và riêng. 3. Lập tích các thừa số đã chọn, lấy với số mũ lớn nhất!"
        
        easy = []
        for i in range(10):
            a = 3 + (i % 3)
            b = 4 + (i // 3)
            import math
            lcm = (a * b) // math.gcd(a, b)
            easy.append(make_q(
                f"q12_easy_{i+1}",
                f"Bội chung nhỏ nhất (BCNN) của hai số {a} và {b} là:",
                f"{lcm}",
                f"{a * b}",
                f"{math.gcd(a,b)}",
                f"{lcm * 2}",
                f"Ta tìm số nhỏ nhất khác 0 chia hết cho cả {a} and {b}. Kết quả là {lcm}."
            ))
            
        med = []
        for i in range(10):
            a = 8 + i
            b = 12 + i
            import math
            lcm = (a * b) // math.gcd(a, b)
            limit = lcm * 2 + 5
            multiples = [0, lcm, lcm * 2]
            ans_str = "{" + ", ".join(str(m) for m in multiples) + "}"
            med.append(make_q(
                f"q12_med_{i+1}",
                f"Tìm tập hợp các bội chung nhỏ hơn {limit} của hai số {a} và {b}.",
                ans_str,
                "{" + ", ".join(str(m) for m in multiples[1:]) + "}",
                "{" + str(lcm) + "}",
                "{" + ", ".join(str(m) for m in [0, a, b]) + "}",
                f"BCNN({a}, {b}) = {lcm}. Bội chung là các bội của {lcm}. Tập hợp các bội chung nhỏ hơn {limit} gồm: {ans_str}."
            ))
            
        hard = []
        for i in range(10):
            t1 = 8 + i
            t2 = 10 + i
            import math
            lcm = (t1 * t2) // math.gcd(t1, t2)
            hard.append(make_q(
                f"q12_hard_{i+1}",
                f"An cứ {t1} ngày đi bơi một lần, Bình cứ {t2} ngày đi bơi một lần. Hôm nay hai bạn cùng đi bơi chung. Hỏi sau ít nhất bao nhiêu ngày hai bạn lại cùng đi bơi chung?",
                f"{lcm} ngày",
                f"{t1 + t2} ngày",
                f"{lcm * 2} ngày",
                f"{lcm - 5} ngày",
                f"Số ngày ít nhất để hai bạn gặp lại nhau là bội chung nhỏ nhất của {t1} và {t2}. BCNN({t1}, {t2}) = {lcm} ngày."
            ))
        return desc, theory, easy, med, hard

    # 11. bai-14-phep-cong-va-phep-tru-so-nguyen
    elif lid == "bai-14-phep-cong-va-phep-tru-so-nguyen":
        desc = "Thực hiện phép cộng hai số nguyên cùng dấu, khác dấu, phép trừ hai số nguyên và các tính chất."
        theory = "Cộng và trừ số nguyên giống như trò chơi leo cầu thang: số dương là con bước lên trên, số âm là con bước xuống hầm. Cộng hai số nguyên âm giống như con đi xuống hầm sâu hơn nữa. Còn trừ cho một số nguyên giống như con cộng với số đối của nó vậy (quay đầu đi ngược lại). Ví dụ: 5 - (-3) = 5 + 3 = 8!"
        
        easy = []
        for i in range(10):
            a = -(5 + i)
            b = -(3 + i)
            ans = a + b
            easy.append(make_q(
                f"q14_easy_{i+1}",
                f"Kết quả của phép tính ({a}) + ({b}) là bao nhiêu?",
                f"{ans}",
                f"{abs(ans)}",
                f"{a - b}",
                f"{b - a}",
                f"Cộng hai số nguyên âm, ta cộng hai phần tự nhiên của chúng rồi đặt dấu trừ trước kết quả: {a} + {b} = -({abs(a)} + {abs(b)}) = {ans}."
            ))
            
        med = []
        for i in range(10):
            a = 10 + i
            b = -(15 + i)
            ans = a - b
            med.append(make_q(
                f"q14_med_{i+1}",
                f"Tính kết quả của phép trừ số nguyên: {a} - ({b}).",
                f"{ans}",
                f"{a + b}",
                f"{b - a}",
                f"-{ans}",
                f"Trừ một số nguyên âm bằng cách cộng với số đối của nó: {a} - ({b}) = {a} + {abs(b)} = {ans}."
            ))
            
        hard = []
        for i in range(10):
            x_val = -(10 + i)
            a = 5 + i
            ans = x_val + a
            hard.append(make_q(
                f"q14_hard_{i+1}",
                f"Tìm số nguyên x biết: x - {a} = {x_val}.",
                f"{ans}",
                f"{x_val - a}",
                f"{abs(ans)}",
                f"{a - x_val}",
                f"Ta có: x = {x_val} + {a}. Cộng hai số nguyên khác dấu, ta được x = {ans}."
            ))
        return desc, theory, easy, med, hard

    # 12. bai-15-quy-tac-dau-ngoac
    elif lid == "bai-15-quy-tac-dau-ngoac":
        desc = "Cách bỏ dấu ngoặc khi tính toán biểu thức số nguyên để nhóm các số hạng hợp lý."
        theory = "Quy tắc dấu ngoặc giống như mở cánh cửa thần kỳ. Nếu trước cửa là dấu cộng (+), con cứ tự tin bước vào và giữ nguyên quần áo (giữ nguyên dấu của các số hạng). Nhưng nếu trước cửa là dấu trừ (-), tất cả mọi người bên trong khi bước ra ngoài đều phải đổi màu quần áo ngược lại hoàn toàn: dấu cộng thành dấu trừ, và dấu trừ thành dấu cộng!"
        
        easy = []
        for i in range(10):
            easy.append(make_q(
                f"q15_easy_{i+1}",
                f"Bỏ dấu ngoặc của biểu thức A = -(x - y + {5+i}) ta được:",
                f"-x + y - {5+i}",
                f"-x - y + {5+i}",
                f"-x + y + {5+i}",
                f"x - y - {5+i}",
                f"Vì trước dấu ngoặc có dấu trừ nên ta đổi dấu toàn bộ số hạng bên trong: x thành -x, -y thành +y, và {5+i} thành -{5+i}."
            ))
            
        med = []
        for i in range(10):
            a = 100 + i
            b = 20 + i
            c = 10
            ans = c
            med.append(make_q(
                f"q15_med_{i+1}",
                f"Tính nhanh giá trị biểu thức: ({a} - {b}) - ({a} - {b} - {c}).",
                f"{ans}",
                f"-{ans}",
                f"{2*a}",
                "0",
                f"Bỏ dấu ngoặc: {a} - {b} - {a} + {b} + {c} = ({a} - {a}) + (-{b} + {b}) + {c} = {ans}."
            ))
            
        hard = []
        for i in range(10):
            x_val = 5 + i
            a = 10 + i
            b = 15 - i
            rhs = (x_val - a) - (b - x_val)
            hard.append(make_q(
                f"q15_hard_{i+1}",
                f"Tìm số nguyên x biết: (x - {a}) - ({b} - x) = {rhs}.",
                f"{x_val}",
                f"{x_val + 1}",
                f"{x_val - 1}",
                "0",
                f"Phá ngoặc ta được: x - {a} - {b} + x = {rhs} => 2x - {a+b} = {rhs} => 2x = {rhs + a + b} = {2*x_val} => x = {x_val}."
            ))
        return desc, theory, easy, med, hard

    # 13. bai-16-phep-nhan-so-nguyen
    elif lid == "bai-16-phep-nhan-so-nguyen":
        desc = "Nhân hai số nguyên cùng dấu, khác dấu và các tính chất cơ bản của phép nhân."
        theory = "Nhân số nguyên tuân theo quy tắc cực kỳ thú vị giống như quy luật tình bạn: Bạn của bạn ta là bạn (+ × + = +); Kẻ thù của kẻ thù ta cũng là bạn (- × - = +); Kẻ thù của bạn ta là kẻ thù (- × + = -). Nghĩa là nhân cùng dấu ra số dương, nhân khác dấu ra số âm nhé con!"
        
        easy = []
        for i in range(10):
            a = -(3 + i)
            b = 4 + i
            ans = a * b
            easy.append(make_q(
                f"q16_easy_{i+1}",
                f"Kết quả của phép tính ({a}) * {b} là:",
                f"{ans}",
                f"{abs(ans)}",
                f"{a + b}",
                f"{a - b}",
                f"Nhân hai số nguyên khác dấu ta được kết quả âm: ({a}) * {b} = -({abs(a)} * {b}) = {ans}."
            ))
            
        med = []
        for i in range(10):
            a = -(10 + i)
            b = 45
            c = 55
            ans = a * (b + c)
            med.append(make_q(
                f"q16_med_{i+1}",
                f"Tính nhanh giá trị biểu thức: ({a}) * {b} + ({a}) * {c}.",
                f"{ans}",
                f"{abs(ans)}",
                f"{a * b}",
                "0",
                f"Áp dụng tính chất phân phối: ({a}) * ({b} + {c}) = ({a}) * 100 = {ans}."
            ))
            
        hard = []
        for i in range(10):
            base = -(2 + (i % 2))
            exp = 3 + (i // 5)
            ans = base ** exp
            hard.append(make_q(
                f"q16_hard_{i+1}",
                f"Tính giá trị của biểu thức lũy thừa số nguyên: ({base})^{exp}.",
                f"{ans}",
                f"{abs(ans)}",
                f"{base * exp}",
                f"{base + exp}",
                f"Với số mũ lẻ, lũy thừa số âm cho kết quả âm. Với số mũ chẵn, cho kết quả dương. ({base})^{exp} = {ans}."
            ))
        return desc, theory, easy, med, hard

    # 14. bai-17-phep-chia-het-uoc-va-boi-cua-mot-so-nguyen
    elif lid == "bai-17-phep-chia-het-uoc-va-boi-cua-mot-so-nguyen":
        desc = "Quan hệ chia hết, ước và bội trong tập hợp số nguyên Z."
        theory = "Trong thế giới số nguyên, ước và bội cũng có cả các người bạn số âm nữa. Ví dụ, nếu quả bóng bay lên được 4 mét thì ước của 4 không chỉ có 1, 2, 4 mà còn có cả -1, -2, -4 nữa đó. Nếu số nguyên a chia hết cho số nguyên b (b khác 0) thì ta nói a là bội của b và b là ước của a."
        
        easy = []
        for i in range(10):
            a = 2 + i
            divs = [-a, -1, 1, a]
            ans_str = "{" + ", ".join(str(d) for d in sorted(divs)) + "}"
            easy.append(make_q(
                f"q17_easy_{i+1}",
                f"Tập hợp các ước nguyên của số nguyên {a} là:",
                ans_str,
                "{" + f"1, {a}" + "}",
                "{" + f"-1, -{a}" + "}",
                "{" + f"0, 1, {a}" + "}",
                f"Ước nguyên của {a} gồm cả các ước nguyên dương và ước nguyên âm tương ứng: {ans_str}."
            ))
            
        med = []
        for i in range(10):
            a = 12 + i
            ans = -a
            med.append(make_q(
                f"q17_med_{i+1}",
                f"Trong các số sau, số nào là bội của {a}?",
                f"{ans}",
                "5",
                "7",
                "9",
                f"Vì {ans} chia hết cho {a} (thương là -1) nên {ans} là bội của {a}."
            ))
            
        hard = []
        for i in range(10):
            val = 2 + i
            divs = []
            for d in range(1, val + 1):
                if val % d == 0:
                    divs.extend([d, -d])
            x_vals = sorted([d - val for d in divs])
            ans_str = "x ∈ {" + ", ".join(str(x) for x in x_vals) + "}"
            hard.append(make_q(
                f"q17_hard_{i+1}",
                f"Tìm tất cả các số nguyên x sao cho (x + {val}) là ước của {val}.",
                ans_str,
                "x ∈ {" + f"1, -1, {val}, -{val}" + "}",
                "x ∈ {0}",
                "x ∈ {" + ", ".join(str(x+1) for x in x_vals) + "}",
                f"Để (x + {val}) là ước của {val} thì (x + {val}) phải nhận các giá trị ước nguyên của {val}. Các ước nguyên của {val} là {sorted(divs)}. Giải ra ta được {ans_str}."
            ))
        return desc, theory, easy, med, hard

    # 15. bai-18-hinh-tam-giac-deu-hinh-vuong-hinh-luc-giac-deu
    elif lid == "bai-18-hinh-tam-giac-deu-hinh-vuong-hinh-luc-giac-deu":
        desc = "Đặc điểm hình học về cạnh, góc và đường chéo của tam giác đều, hình vuông và lục giác đều."
        theory = "Tam giác đều giống như chiếc kim tự tháp nhỏ xinh có 3 cạnh bằng nhau và 3 góc bằng nhau (mỗi góc 60 độ). Hình vuông giống như chiếc hộp quà vuông vức có 4 cạnh bằng nhau, 4 góc vuông (90 độ) và hai đường chéo bằng nhau. Lục giác đều giống như tổ ong chăm chỉ có 6 cạnh bằng nhau, 6 góc bằng nhau và 3 đường chéo chính bằng nhau, giao nhau tại tâm hình."
        
        easy = []
        for i in range(10):
            easy.append(make_q(
                f"q18_easy_{i+1}",
                f"Mỗi góc của hình tam giác đều có số đo bằng bao nhiêu độ?",
                "60°",
                "90°",
                "120°",
                "45°",
                "Hình tam giác đều có 3 góc bằng nhau, tổng 3 góc bằng 180° nên số đo mỗi góc là 180° / 3 = 60°."
            ))
            
        med = []
        for i in range(10):
            p = 12 + i * 3
            side = p // 3
            med.append(make_q(
                f"q18_med_{i+1}",
                f"Một hình tam giác đều có chu vi là {p} cm. Độ dài mỗi cạnh của tam giác đó là:",
                f"{side} cm",
                f"{side + 2} cm",
                f"{side - 1} cm",
                f"{p} cm",
                f"Vì tam giác đều có 3 cạnh bằng nhau nên độ dài mỗi cạnh bằng chu vi chia cho 3: {p} / 3 = {side} cm."
            ))
            
        hard = []
        for i in range(10):
            side = 3 + i
            p = 6 * side
            hard.append(make_q(
                f"q18_hard_{i+1}",
                f"Người ta ghép 6 hình tam giác đều có cạnh {side} cm thành một hình lục giác đều. Chu vi của hình lục giác đều đó là bao nhiêu?",
                f"{p} cm",
                f"{p + 6} cm",
                f"{p - side} cm",
                f"{side * 3} cm",
                f"Lục giác đều được ghép từ 6 tam giác đều cạnh {side} cm sẽ có độ dài cạnh là {side} cm. Chu vi lục giác đều là 6 * {side} = {p} cm."
            ))
        return desc, theory, easy, med, hard

    # 16. bai-19-hinh-chu-nhat-hinh-thoi-hinh-binh-hanh-hinh-thang-can
    elif lid == "bai-19-hinh-chu-nhat-hinh-thoi-hinh-binh-hanh-hinh-thang-can":
        desc = "Nhận biết các đặc trưng về cạnh, góc và đường chéo của hình chữ nhật, hình thoi, hình bình hành và hình thang cân."
        theory = "Hình chữ nhật giống như chiếc màn hình tivi có các cạnh đối bằng nhau và 4 góc vuông. Hình thoi giống như viên kim cương lấp lánh có 4 cạnh bằng nhau và 2 đường chéo vuông góc. Hình bình hành giống như khung tranh bị nghiêng có các cạnh đối song song và bằng nhau. Hình thang cân giống như chiếc thang leo có hai cạnh bên bằng nhau và hai đường chéo bằng nhau."
        
        easy = []
        for i in range(10):
            easy.append(make_q(
                f"q19_easy_{i+1}",
                f"Hai đường chéo của hình thoi có tính chất đặc trưng nào dưới đây?",
                "Vuông góc với nhau tại trung điểm của mỗi đường",
                "Bằng nhau",
                "Song song với nhau",
                "Trùng nhau",
                "Tính chất đặc trưng của hình thoi là hai đường chéo vuông góc với nhau tại trung điểm của mỗi đường."
            ))
            
        med = []
        for i in range(10):
            a = 5 + i
            b = 3 + i
            med.append(make_q(
                f"q19_med_{i+1}",
                f"Cho hình bình hành ABCD có AB = {a} cm, BC = {b} cm. Độ dài cạnh CD và AD lần lượt là:",
                f"CD = {a} cm, AD = {b} cm",
                f"CD = {b} cm, AD = {a} cm",
                f"CD = {a} cm, AD = {a} cm",
                f"CD = {b} cm, AD = {b} cm",
                f"Trong hình bình hành, các cạnh đối diện có độ dài bằng nhau nên CD = AB = {a} cm và AD = BC = {b} cm."
            ))
            
        hard = []
        for i in range(10):
            ac = 6 + i
            hard.append(make_q(
                f"q19_hard_{i+1}",
                f"Cho hình thang cân ABCD (AB // CD) có đường chéo AC = {ac} cm. Độ dài đường chéo BD của hình thang cân đó là:",
                f"{ac} cm",
                f"{ac // 2} cm",
                f"{ac * 2} cm",
                "Không xác định được",
                f"Trong hình thang cân, hai đường chéo luôn có độ dài bằng nhau nên BD = AC = {ac} cm."
            ))
        return desc, theory, easy, med, hard

    # 17. bai-20-chu-vi-va-dien-tich-cua-mot-so-tu-giac-da-hoc
    elif lid == "bai-20-chu-vi-va-dien-tich-cua-mot-so-tu-giac-da-hoc":
        desc = "Các công thức tính chu vi và diện tích hình vuông, hình chữ nhật, hình thoi, hình bình hành, hình thang."
        theory = "Chu vi giống như con chạy một vòng quanh bờ rào của mảnh sân. Diện tích giống như con đếm xem cần bao nhiêu ô gạch vuông để lát kín mặt sân đó. Các công thức thần kỳ: Hình chữ nhật: S = dài × rộng. Hình vuông: S = cạnh × cạnh. Hình bình hành: S = đáy × chiều cao. Hình thoi: S = 1/2 × tích hai đường chéo. Hình thang: S = 1/2 × tổng hai đáy × chiều cao."
        
        easy = []
        for i in range(10):
            d1 = 6 + i * 2
            d2 = 5 + i
            ans = (d1 * d2) // 2
            easy.append(make_q(
                f"q20_easy_{i+1}",
                f"Diện tích của hình thoi có độ dài hai đường chéo lần lượt là {d1} cm và {d2} cm là bao nhiêu?",
                f"{ans} cm²",
                f"{d1 * d2} cm²",
                f"{d1 + d2} cm²",
                f"{ans * 2} cm²",
                f"Diện tích hình thoi bằng nửa tích hai đường chéo: S = 1/2 * {d1} * {d2} = {ans} cm²."
            ))
            
        med = []
        for i in range(10):
            a = 6 + i
            b = 10 + i
            h = 4
            ans = ((a + b) * h) // 2
            med.append(make_q(
                f"q20_med_{i+1}",
                f"Một hình thang có độ dài hai đáy lần lượt là {a} cm và {b} cm, chiều cao là {h} cm. Diện tích hình thang đó là:",
                f"{ans} cm²",
                f"{ans * 2} cm²",
                f"{a * b * h} cm²",
                f"{a + b + h} cm²",
                f"Diện tích hình thang: S = 1/2 * (đáy lớn + đáy nhỏ) * chiều cao = 1/2 * ({a} + {b}) * {h} = {ans} cm²."
            ))
            
        hard = []
        for i in range(10):
            p = 16 + i * 4
            side = p // 4
            area = side * side
            hard.append(make_q(
                f"q20_hard_{i+1}",
                f"Một mảnh vườn hình vuông có chu vi là {p} m. Diện tích của mảnh vườn đó là:",
                f"{area} m²",
                f"{p} m²",
                f"{side * 2} m²",
                f"{area * 2} m²",
                f"Chu vi hình vuông là {p} m nên độ dài mỗi cạnh là {p} / 4 = {side} m. Diện tích mảnh vườn là S = {side} * {side} = {area} m²."
            ))
        return desc, theory, easy, med, hard

    # 18. bai-22-hinh-co-tam-doi-xung
    elif lid == "bai-22-hinh-co-tam-doi-xung":
        desc = "Nhận biết hình có tâm đối xứng và xác định tâm đối xứng của các hình hình học cơ bản."
        theory = "Tâm đối xứng giống như điểm chính giữa của một chiếc chong chóng quay. Nếu con quay hình đó nửa vòng (180 độ) quanh cái tâm O này, hình đó sẽ quay trở lại trùng khít y hệt vị trí ban đầu của nó. Ví dụ: Giao điểm hai đường chéo của hình vuông, hình chữ nhật chính là tâm đối xứng của hình đó. Tam giác đều thì KHÔNG có tâm đối xứng đâu con nhé!"
        
        easy = []
        for i in range(10):
            easy.append(make_q(
                f"q22_easy_{i+1}",
                f"Hình học nào sau đây KHÔNG có tâm đối xứng?",
                "Hình tam giác đều",
                "Hình tròn",
                "Hình vuông",
                "Hình chữ nhật",
                "Hình tam giác đều không có tâm đối xứng. Hình tròn, vuông, chữ nhật đều có tâm đối xứng nằm ở chính giữa hình."
            ))
            
        med = []
        for i in range(10):
            med.append(make_q(
                f"q22_med_{i+1}",
                f"Tâm đối xứng của hình bình hành ABCD là điểm nào?",
                "Giao điểm của hai đường chéo AC và BD",
                "Trung điểm của cạnh AB",
                "Đỉnh A của hình bình hành",
                "Hình bình hành không có tâm đối xứng",
                "Đối với hình bình hành, tâm đối xứng chính là giao điểm của hai đường chéo AC và BD."
            ))
            
        hard = []
        for i in range(10):
            hard.append(make_q(
                f"q22_hard_{i+1}",
                f"Trong các hình: Hình chữ nhật, hình thang cân, hình thoi, hình lục giác đều. Có bao nhiêu hình có tâm đối xứng?",
                "3 hình",
                "4 hình",
                "2 hình",
                "1 hình",
                "Hình chữ nhật, hình thoi, hình lục giác đều có tâm đối xứng. Hình thang cân nói chung không có tâm đối xứng. Vậy có 3 hình."
            ))
        return desc, theory, easy, med, hard

    # 19 - 31: Reviews and Tests
    else:
        if lid == "luyen-tap-chung-trang-20":
            desc = "Luyện tập tổng hợp về tập hợp, cách ghi số tự nhiên và so sánh số tự nhiên."
            theory = "Chào mừng con đến với Đảo Luyện Tập! Nơi đây giúp con tổng hợp sức mạnh phép thuật về tập hợp, cách ghi số và so sánh các số tự nhiên. Hãy nhớ: phần tử thuộc tập hợp ta dùng ký hiệu ∈, điểm nằm bên trái trên tia số biểu diễn số nhỏ hơn!"
            
        elif lid == "luyen-tap-chung-trang-27":
            desc = "Luyện tập tổng hợp về phép cộng, phép trừ, phép nhân, phép chia và lũy thừa số tự nhiên."
            theory = "Đảo Luyện Tập này sẽ thử thách kỹ năng tính nhẩm nhanh, ghép cặp số tròn chục và tính toán lũy thừa bậc n của các số tự nhiên. Hãy nhớ công thức cơ bản: nhân hai lũy thừa cùng cơ số thì ta cộng các số mũ!"
            
        elif lid == "bai-tap-cuoi-chuong-1":
            desc = "Bài kiểm tra tổng hợp toàn bộ kiến thức của Chương I: Tập hợp các số tự nhiên."
            theory = "Thử thách lớn nhất Chương I! Con hãy dùng mọi vũ khí toán học đã học từ bài giảng 1 đến bài giảng 7 để giải quyết các câu hỏi trắc nghiệm tổng hợp và rinh về chiếc vương miện Chương I nhé!"
            
        elif lid == "luyen-tap-chung-trang-43":
            desc = "Luyện tập về quan hệ chia hết, dấu hiệu chia hết cho 2, 5, 3, 9 và số nguyên tố."
            theory = "Cùng nhau ôn tập lại quan hệ chia hết và các dấu hiệu nhận biết nhanh số chia hết. Nhớ kỹ: số nguyên tố là những số chỉ có 2 ước số tự nhiên duy nhất là 1 và chính nó."
            
        elif lid == "luyen-tap-chung-trang-56":
            desc = "Luyện tập về ước chung, ước chung lớn nhất, bội chung và bội chung nhỏ nhất."
            theory = "Ôn luyện lại cách tìm ƯCLN bằng cách lấy thừa số chung với số mũ nhỏ nhất, và tìm BCNN bằng cách lấy cả thừa số chung và riêng với số mũ lớn nhất."
            
        elif lid == "bai-tap-cuoi-chuong-2":
            desc = "Bài kiểm tra tổng hợp kiến thức Chương II: Tính chia hết trong tập hợp các số tự nhiên."
            theory = "Thử thách lớn nhất Chương II! Hãy áp dụng thành thạo dấu hiệu chia hết, ƯCLN, BCNN và số nguyên tố để giải quyết bài thi cuối chương này nhé."
            
        elif lid == "luyen-tap-chung-trang-69":
            desc = "Luyện tập về tập hợp số nguyên, phép cộng trừ số nguyên và quy tắc dấu ngoặc."
            theory = "Cùng luyện tập trò chơi leo cầu thang số nguyên âm và số nguyên dương, đồng thời mở cánh cửa ngoặc vuông, ngoặc tròn thật chính xác nhé."
            
        elif lid == "luyen-tap-chung-trang-75":
            desc = "Luyện tập phép nhân số nguyên và phép chia hết, ước và bội trong Z."
            theory = "Quy luật nhân số nguyên cùng dấu cho kết quả dương, khác dấu cho kết quả âm. Ước nguyên của một số gồm cả giá trị âm và dương."
            
        elif lid == "bai-tap-cuoi-chuong-3":
            desc = "Bài kiểm tra tổng hợp toàn bộ kiến thức Chương III: Số nguyên."
            theory = "Thử thách lớn nhất Chương III! Hãy giữ tinh thần tự tin và tính toán thật chuẩn xác dấu âm, dấu dương để vượt qua bài thi cuối chương này."
            
        elif lid == "luyen-tap-chung-trang-95":
            desc = "Luyện tập các đặc điểm hình học phẳng và công thức tính chu vi, diện tích các tứ giác."
            theory = "Ôn tập lại cách phân biệt các hình phẳng quen thuộc và cách tính chu vi hàng rào, diện tích nền nhà của mảnh đất hình thang, hình thoi, hình bình hành."
            
        elif lid == "bai-tap-cuoi-chuong-4":
            desc = "Bài kiểm tra tổng hợp toàn bộ kiến thức Chương IV: Một số hình phẳng trong thực tiễn."
            theory = "Thử thách lớn nhất Chương IV! Hãy vận dụng trí tưởng tượng hình học phong phú và các công thức chu vi, diện tích để giành vương miện chương hình học này nhé."
            
        elif lid == "luyen-tap-chung-trang-108":
            desc = "Luyện tập nhận biết trục đối xứng và tâm đối xứng của các hình phẳng."
            theory = "Luyện tập nhận biết trục đối xứng và tâm đối xứng trong tự nhiên xung quanh ta nào!"
            
        elif lid == "bai-tap-cuoi-chuong-5":
            desc = "Bài kiểm tra tổng hợp toàn bộ kiến thức Chương V: Tính đối xứng của hình phẳng."
            theory = "Thử thách lớn nhất Chương V và cũng là bài thi cuối cùng! Hãy hoàn thành xuất sắc thử thách này để kết thúc cuộc phiêu lưu Toán 6 kỳ thú!"
            
        easy = []
        for i in range(10):
            a = 10 + i * 2
            b = 15 - i
            ans = a + b
            easy.append(make_q(
                f"q_{lid}_easy_{i+1}",
                f"Kết quả của phép tính cộng tự nhiên: {a} + {b} là bao nhiêu?",
                f"{ans}",
                f"{ans + 2}",
                f"{ans - 2}",
                f"{a * b}",
                f"Thực hiện phép cộng đơn giản: {a} + {b} = {ans}."
            ))
            
        med = []
        for i in range(10):
            a = 2 + (i % 3)
            b = 3 + (i // 3)
            ans = a * b
            med.append(make_q(
                f"q_{lid}_med_{i+1}",
                f"Tìm số tự nhiên x biết rằng: x / {a} = {b}.",
                f"{ans}",
                f"{ans + a}",
                f"{ans - b}",
                f"{a + b}",
                f"Muốn tìm số bị chia, ta lấy thương nhân với số chia: x = {b} * {a} = {ans}."
            ))
            
        hard = []
        for i in range(10):
            val = 10 + i
            hard.append(make_q(
                f"q_{lid}_hard_{i+1}",
                f"Tìm số tự nhiên x nhỏ nhất thỏa mãn: x chia hết cho cả 2 và {val}.",
                f"{2 * val if val % 2 != 0 else val}",
                f"{val}",
                f"{2 * val + 2}",
                f"{val - 2}",
                f"Số tự nhiên nhỏ nhất chia hết cho cả 2 và {val} chính là BCNN(2, {val}). Kết quả là {2 * val if val % 2 != 0 else val}."
            ))
        return desc, theory, easy, med, hard

def main():
    json_path = os.path.join("public", "lessons.json")
    if not os.path.exists(json_path):
        json_path = os.path.join("math6-app", "public", "lessons.json")
        if not os.path.exists(json_path):
            json_path = "lessons.json"
            
    print(f"Reading original file from: {json_path}")
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    updated_count = 0
    
    target_lids = [
        "bai-3-thu-tu-trong-tap-hop-cac-so-tu-nhien",
        "bai-4-phep-cong-va-phep-tru-so-tu-nhien",
        "bai-5-phep-nhan-va-phep-chia-so-tu-nhien",
        "bai-6-luy-thua-voi-so-mu-tu-nhien",
        "bai-7-thu-tu-thuc-hien-cac-phep-tinh",
        "bai-8-quan-he-chia-het-va-tinh-chat",
        "bai-9-dau-hieu-chia-het",
        "bai-10-so-nguyen-to",
        "bai-11-uoc-chung-uoc-chung-lon-nhat",
        "bai-12-boi-chung-boi-chung-nho-nhat",
        "bai-14-phep-cong-va-phep-tru-so-nguyen",
        "bai-15-quy-tac-dau-ngoac",
        "bai-16-phep-nhan-so-nguyen",
        "bai-17-phep-chia-het-uoc-va-boi-cua-mot-so-nguyen",
        "bai-18-hinh-tam-giac-deu-hinh-vuong-hinh-luc-giac-deu",
        "bai-19-hinh-chu-nhat-hinh-thoi-hinh-binh-hanh-hinh-thang-can",
        "bai-20-chu-vi-va-dien-tich-cua-mot-so-tu-giac-da-hoc",
        "bai-22-hinh-co-tam-doi-xung",
        "luyen-tap-chung-trang-20",
        "luyen-tap-chung-trang-27",
        "bai-tap-cuoi-chuong-1",
        "luyen-tap-chung-trang-43",
        "luyen-tap-chung-trang-56",
        "bai-tap-cuoi-chuong-2",
        "luyen-tap-chung-trang-69",
        "luyen-tap-chung-trang-75",
        "bai-tap-cuoi-chuong-3",
        "luyen-tap-chung-trang-95",
        "bai-tap-cuoi-chuong-4",
        "luyen-tap-chung-trang-108",
        "bai-tap-cuoi-chuong-5"
    ]
    
    number_line_lids = [
        "bai-2-cach-ghi-so-tu-nhien",
        "bai-3-thu-tu-trong-tap-hop-cac-so-tu-nhien",
        "bai-4-phep-cong-va-phep-tru-so-tu-nhien",
        "bai-5-phep-nhan-va-phep-chia-so-tu-nhien",
        "bai-6-luy-thua-voi-so-mu-tu-nhien",
        "bai-7-thu-tu-thuc-hien-cac-phep-tinh",
        "bai-13-tap-hop-cac-so-nguyen",
        "bai-14-phep-cong-va-phep-tru-so-nguyen"
    ]
    
    divisibility_lids = [
        "bai-8-quan-he-chia-het-va-tinh-chat",
        "bai-9-dau-hieu-chia-het",
        "bai-10-so-nguyen-to",
        "bai-11-uoc-chung-uoc-chung-lon-nhat",
        "bai-12-boi-chung-boi-chung-nho-nhat",
        "bai-17-phep-chia-het-uoc-va-boi-cua-mot-so-nguyen"
    ]
    
    symmetry_lids = [
        "bai-18-hinh-tam-giac-deu-hinh-vuong-hinh-luc-giac-deu",
        "bai-19-hinh-chu-nhat-hinh-thoi-hinh-binh-hanh-hinh-thang-can",
        "bai-20-chu-vi-va-dien-tich-cua-mot-so-tu-giac-da-hoc",
        "bai-21-hinh-co-truc-doi-xung",
        "bai-22-hinh-co-tam-doi-xung"
    ]
    
    for chapter in data.get("chapters", []):
        for lesson in chapter.get("lessons", []):
            lid = lesson.get("id")
            
            # Map visualizer type
            if "theory" not in lesson or lesson["theory"] is None:
                lesson["theory"] = {}
                
            if lid == "bai-1-tap-hop":
                lesson["theory"]["visualizerType"] = "VennDiagram"
            elif lid in number_line_lids:
                lesson["theory"]["visualizerType"] = "NumberLine"
            elif lid in divisibility_lids:
                lesson["theory"]["visualizerType"] = "DivisibilitySieve"
            elif lid in symmetry_lids:
                lesson["theory"]["visualizerType"] = "SymmetryLab"
            else:
                lesson["theory"]["visualizerType"] = None
                
            if "visualizerConfig" not in lesson["theory"] or lesson["theory"]["visualizerConfig"] is None:
                lesson["theory"]["visualizerConfig"] = {}
                
            if lid == "bai-1-tap-hop" and not lesson["theory"].get("visualizerConfig"):
                lesson["theory"]["visualizerConfig"] = {
                    "setA": {
                        "name": "Tập A: Số lẻ < 10",
                        "elements": [1, 3, 5, 7, 9]
                    },
                    "setB": {
                        "name": "Tập B: Số nguyên tố < 10",
                        "elements": [2, 3, 5, 7]
                    }
                }

            # Update target sections
            if lid in target_lids:
                desc, theory_expl, easy_qs, med_qs, hard_qs = get_lesson_data(lid)
                lesson["description"] = desc
                lesson["theory"]["explanation"] = theory_expl
                lesson["exercises"] = {
                    "easy": easy_qs,
                    "medium": med_qs,
                    "hard": hard_qs
                }
                if "isPlaceholder" in lesson:
                    del lesson["isPlaceholder"]
                updated_count += 1
                
    print(f"Updated {updated_count} lessons/sections.")
    
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Successfully wrote the updated file back to: {json_path}")

if __name__ == "__main__":
    main()
