//初始化变量
var work = false; //开机标志 false:关机 true:开机

var op1 = 0; //操作数1

var op2 = 0; //操作数2

var operators = false; //运算符标志   false:没有点击运算符按钮  true:点击了运算符按钮

var oper = "";				//保存运算符变量

var equ = false;			//是否进行计算标志位  false:没有进行计算  true:进行计算了

var str;							//保存数字按钮的值

//开机函数
function start() {
	work = true;
	var str = document.getElementById("result");
//	str.placeholder = "0";
//	str.maxLength = "5"; //不知道为什么设置最大长度无效?
	clearScreen();//清除屏幕
}

//关机
function shutDown() {
	work = false;
	var str = document.getElementById("result");
	str.value = "";							//显示input文本框为空
	str.disabled = "disabled";  //禁用input元素
//	str.removeAttribute("placeholder");
}

//清屏
function clearScreen() {
	if(work) {
		var str = document.getElementById("result");
		str.removeAttribute("disabled"); //移出disabled属性 (disabled:被禁用的input元素既不可用,也不可点击)
		str.value = "0";							//设置文本框为0
	}
}

//数字按钮
function clicked(id) {//传入点击按钮的id值
	if(work) {//判断是否开机
		str = document.getElementById("result");
		if(id < 10) {
			//判断是否是数字按钮 
			//&& str.value.length < 15 这个条件可以限制输入字数,但是可能对计算结果造成影响
			if(str.value.charAt(0) == 0 && str.value.indexOf(".") < 0 || operators == true || equ == true) {
				//首字符不为0 没有小数点或者点击了运算符
				str.value = "";
				operators = false;
				equ = false;
			}
			str.value += id; //显示
		} else {
		//如果不是数字,就根据对应的按钮进行操作
			switch(id) {
				case 10:
					str.value += ".";
					break;
				case 11:
					operators = true;
					op1 = str.value;
					oper = "+";
					break;
				case 12:
					operators = true;
					op1 = str.value;
					oper = "一";
					break;
				case 13:
					operators = true;
					op1 = str.value;
					oper = "*";
					break;
				case 14:
					operators = true;
					op1 = str.value;
					oper = "/";
					break;
				case 15:
					operators = true;
					op1 = str.value;
					oper = "%";
					equal();
					break;
				case 16:
					operators = true;
					op1 = str.value;
					oper = "√";
					equal();
					break;
				case 17:
					operators = true;
					op1 = str.value;
					oper = "1/x";
					equal();
					break;
				case 18:
					operators = true;
					op1 = str.value;
					oper = "-";
					equal();
					break;
				case 19:
					op2 = str.value;
					equal();
					break;
				default:
					break;
			}
		}
	}
}

//等于判断操作符
function equal() {
	equ = true;
	switch(oper) {
		case "+":
			str.value = eval(parseFloat(op1) + parseFloat(op2));
			break;
		case "一":
			str.value = eval(parseFloat(op1) - parseFloat(op2));
			break;
		case "*":
			str.value = eval(parseFloat(op1) * parseFloat(op2));
			break;
		case "/":
			str.value = eval(parseFloat(op1) / parseFloat(op2));
			break;
		case "%":
			str.value = eval(parseFloat(op1) / 100);
			break;
		case "√":
			str.value = eval(Math.sqrt(parseFloat(op1)));
			break;
		case "1/x":
			str.value = eval(1 / parseFloat(op1));
			break;
		case "-":
			str.value = eval(0 - parseFloat(op1));
//			clicked();
//			op2 = 
			break;
	}
	//计算完毕后操作数初始化
	op1 = 0;
	op2 = 0;
}