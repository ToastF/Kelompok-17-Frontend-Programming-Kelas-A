// untuk membuat aplikasi lebih modular, kita membuat class kalkulator yang berisi fungsi-fungsi kalkulator tersebut
class Calculator {
    // constructor dari kalkulator yang berisi elemen text previous operand dan current operand yang akan dimanipulasi
    constructor(prevText,curText){
        this.prevText = prevText;
        this.curText = curText;
        this.clearAll();
    }

    // tombol AC, clear semua data
    clearAll(){
        this.curr = '';
        this.prev = '';
        this.operation = undefined
    }

    // tombol C, clear input nya saja (current operand) tanpa menghilangkan perhitungan sebelumnya
    clearInput(){
        this.curr = '';
    }

    // tombol backspace, hapus angka input sekali dari belakang
    backSpace(){
        this.curr = this.curr.toString().slice(0, -1);
    }

    // untuk menambahkan angka dalam string input pada display
    appendNum(num){
        // agar tidak dapat ngespam '.'
        if (num === '.' && this.curr.includes('.')) return

        this.curr = this.curr.toString() + num.toString();
    }

    // untuk set operator perhitungan
    getOperation(op){
        // hanya bisa berjalan jika ada angka untuk dihitung
        if(this.curr === '') return
        // jika sudah ada angka terhitung (prev != null), otomatis hitung sebelum lanjut
        if(this.prev !== '') {
            this.computeOperation();
        }
        // set op dan lanjut ke operand baru sehingga curr menjadi prev
        this.op = op
        this.prev = this.curr
        this.curr = ''
    }

    // handle perhitungan sesuai operator
    computeOperation(){
        // inisialisasi variabel
        let result
        // jadikan float
        const prev = parseFloat(this.prev) 
        const curr = parseFloat(this.curr)
        // hanya dapat bekerja jika keduanya merupakan angka
        if(isNaN(prev) || isNaN(curr)) return
        // switch case biasa
        switch(this.op){
            case '+': 
                result = prev + curr 
                break;
            case '-': 
                result = prev - curr
                break;
            case '*':
                result = prev * curr
                break;
            case '÷':
                result = prev / curr
                break;
            case '%':
                result = prev % curr
                break;
            default:
                return
        }
        // set current dengan hasil
        this.curr = result.toString();
        // reset operator
        this.op = undefined;
        // reset prev
        this.prev = '';
    }

    // fungsi untuk melakukan akar
    // karena akar adalah operator unary (hanya satu parameter)
    sqrt() {
        // curr harus berisi angka
        if (this.curr === '') return;
        // ubah menjadi angka float
        const num = parseFloat(this.curr);
        // jika bukan angka, return
        if (isNaN(num)) return;
        // set curr dengan hasil perakaran yang diubah menjadi string
        this.curr = Math.sqrt(num).toString();
    }

    // fungsi untuk update display dengan data terbaru
    updateDisplayText(){
        this.curText.innerText = this.formatDisplayNum(this.curr)
        if(this.op != null){
            // memasuki operator bersama dengan operand
            this.prevText.innerText = `${this.formatDisplayNum(this.prev)} ${this.op}`;
        }
        else{
            this.prevText.innerText = `${this.formatDisplayNum(this.prev)}`
        }
    }

    // fungsi untuk memberi pemisah desimal pada angka dalam display
    formatDisplayNum(num) {
        const strNum = num.toString();
        // memisah bagian integer dan bagian desimal
        const [intPart, decPart] = strNum.split('.');

        let intToDisplay;
        // jika kosong (seperti pencet .)
        if (intPart === "") {
            intToDisplay = "";
        } else {
            const intDigits = parseFloat(intPart);
            intToDisplay = isNaN(intDigits)
                ? ""
                // inggris otomatis memberi koma sebagai pemisah
                : intDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }

        // string concatenation
        if (decPart != null) {
            return decPart === "" 
                ? `${intToDisplay}.`
                : `${intToDisplay}.${decPart}`;
        } else {
            return intToDisplay;
        }
    }



}

// DOM manipulasi untuk mendapatkan elemen button
document.addEventListener("DOMContentLoaded", () => {
    const numButtons = document.querySelectorAll("button.num");
    console.log(numButtons);
    const opButtons = document.querySelectorAll("button.op");
    console.log(opButtons);
    const backSpaceButton = document.querySelector("button.backspace");
    console.log(backSpaceButton);
    const clearAllButton = document.querySelector("button.clear-all");
    console.log(clearAllButton);
    const clearInputButton = document.querySelector("button.clear-input");
    console.log(clearInputButton);
    const equalButton = document.querySelector("button.equals")
    console.log(equalButton);
    const squareButton = document.querySelector("button.square")
    console.log(squareButton)
    const prevText = document.querySelector(".prev");
    console.log(prevText);
    const curText = document.querySelector(".cur");
    console.log(curText);

    // buat objek kalkulator
    const calculator = new Calculator(prevText,curText);

    // beri event listeners pada tombol2 saat dipencet
    numButtons.forEach(button =>{
        button.addEventListener('click',() => {
            calculator.appendNum(button.innerText)
            calculator.updateDisplayText()
            console.log(`appended ${button.innerText}`)
        })
    })

    opButtons.forEach(button =>{
        button.addEventListener('click',() => {
            calculator.getOperation(button.innerText)
            calculator.updateDisplayText()
            console.log(`chose operator" ${button.innerText}`)
        })
    })

    equalButton.addEventListener('click', button => {
        calculator.computeOperation();
        calculator.updateDisplayText();
    })

    clearAllButton.addEventListener('click', button => {
        calculator.clearAll();
        calculator.updateDisplayText();
    })

    clearInputButton.addEventListener('click', button => {
        calculator.clearInput();
        calculator.updateDisplayText();
    })

    backSpaceButton.addEventListener('click', button => {
        calculator.backSpace();
        calculator.updateDisplayText();
    })

    squareButton.addEventListener('click', () => {
        calculator.sqrt();
        calculator.updateDisplayText();
    })

});

