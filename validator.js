/**
 * Duomenu objekto validatorius, kuris tikrina, ar duomenu objekte yra tik leistini raktazodziai.
 * 
 * Objekte gali buti ir papildomu neprivalomu, bet vis vien leistinu raktazodziu (optional keys)
 * @param {Object} obj Duomenu objektas
 * @returns {[boolean, string]} Rezultatas, kur pirmasis parametras reiskia ar buvo rasta klaida, o antrasis - zinute (aprasanti klaida)
 */
function validator(obj, rules) {

    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
        return [true, 'Neduotas objektas']
    }

    if (typeof rules !== 'object' || rules === null || Array.isArray(rules)) {
        return [true, 'Neduotas strukturos objektas']
    }

    // Object.keys(obj) !== rules.required
    // Object.keys({}) !== rules.required
    // [] !== rules.required
    // [] !== ['name']
    // [] !== ['name']
    // true

    console.log(Object.keys(obj));
    console.log(rules.required);


    if (rules.required && rules.optional) {
        if (Object.keys(obj).length < rules.required.length) {
            return [true, 'Truksta privalomo key']
        }

        for (const key of rules.required) {
            if (key in obj === false) {
                return [true, 'Truksta privalomo key']
            }
        }

        for (const key of Object.keys(obj)) {
            if (![...rules.required, ...rules.optional].includes(key)) {
                return [true, 'Pateiktas netinkamas key']
            }
        }
    }

    return [false, 'OK']
}

module.exports = validator;