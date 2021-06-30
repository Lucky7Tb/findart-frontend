export default {
	dateFormat(date) {
		let newDate = '';
		const oldDate = date.split('-');
		const oldMonth = oldDate[1];
		switch (oldMonth) {
		case '01':
			oldDate['1'] = 'Jan';
			break;
		case '02':
			oldDate['1'] = 'Feb';
			break;
		case '03':
			oldDate['1'] = 'Mar';
			break;
		case '04':
			oldDate['1'] = 'Apr';
			break;
		case '05':
			oldDate['1'] = 'Mei';
			break;
		case '06':
			oldDate['1'] = 'Jun';
			break;
		case '07':
			oldDate['1'] = 'Jul';
			break;
		case '08':
			oldDate['1'] = 'Agust';
			break;
		case '09':
			oldDate['1'] = 'Sept';
			break;
		case '10':
			oldDate['1'] = 'Okt';
			break;
		case '11':
			oldDate['1'] = 'Nov';
			break;
		case '12':
			oldDate['1'] = 'Des';
			break;
		default:
			oldDate['1'] = 'error';
			break;
		}
		newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`;
		return newDate;
	},
	rupiahFormat(value) {
		const numberString = value.replace(/[^,\d]/g, '').toString();
		const split = numberString.split(',');
		const sisa = split[0].length % 3;
		let rupiah = split[0].substr(0, sisa);
		const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
		if (ribuan) {
			const separator = sisa ? '.' : '';
			rupiah += separator + ribuan.join('.');
		}
		rupiah = split[1] !== undefined ? `${rupiah}, ${split[1]}` : rupiah;
		return `Rp. ${rupiah}`;
	},
	indonesiaNumberFormat(number) {
		let newNumber = number.split('');
		newNumber[0] = '+62';
		newNumber = newNumber.join('');
		return newNumber;
	},
};
