
export default function translit(input) {
	let ru = [" ", "-", "а", "б", "в", "г", "д", "е", "ё",  "ж",  "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х",  "ц",  "ч",  "ш",  "щ",   "ъ", "ы", "ь", "э", "ю",  "я" ];
	let en = [" ", "-", "a", "b", "v", "g", "d", "e", "yo", "zh", "z", "i", "y", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "f", "kh", "ts", "ch", "sh", "sch", "'", "y", "'", "e", "yu", "ya"];

	let output = '';
	for(let i=0; i<input.length; i++) {
		output += en[ru.indexOf(input[i].toLowerCase())];
	};
	output = output[0].toUpperCase;

	return output;
};