let formTest = {
	reg_phone(num) {//验证手机号
		const reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
		return reg.test(num) ? true : false
    },
    reg_email(email) {//验证邮箱
		const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
		return reg.test(email) ? true : false
    },
    req_idcard(id){//验证身份证
        const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        return reg.test(id) ? true : false
    },
    reg_qq(qq){//验证QQ
        const reg = /[1-9][0-9]{4,14}/; //4-14位QQ
		return reg.test(qq) ? true : false 
    },
}

export default {
    formTest,
}
