const { EROFS } = require('constants');
const fs = require('fs')
const xml2js = require('xml2js');

class XMLDataParserService {
    constructor() {
        this.data = fs.readFileSync(__dirname + '/czasopisma.xml', 'utf8');
    }

    getData() {
        return new Promise((resolve, reject) => {
            xml2js.parseString(this.data, {
                explicitArray: false
            }, (err, result) => {
                if(err){
                    return reject(err)
                }
                result = result.czasopisma
                // console.log(JSON.parse(JSON.stringify(result)));
                /**
                 * result.lata to:
                 * {
                 *   IKS: "1986,1987,1988,1989,nr specjalne",
                 *   Avax: "1990,1991"
                 * }
                 */
                this.explodeDates(result.lata)
                /**
                 * result.lata to:
                 * {
                 *   IKS: ["1986","1987","1988","1989","nr specjalne"],
                 *   Avax: ["1990","1991"]
                 * }
                 */
                this.relinkDetails(result)
                resolve(result)
                // this.XML_initia_data = JSON.stringify(result.czasopisma, null, 4)
            });
        })

    }

    explodeDates(obj) {
        // ["IKS", "Avax"].map()
        Object.keys(obj).map((key, index) => {
            /**
             * {
             *   IKS: ["1986", "1987", "1988"]
             * }
             */
            obj[key] = obj[key].split(',');
        });

    }

    relinkDetails(obj) {
        let zmienne = obj.zmienne
        let lata = obj.lata


        for (let [key, value] of Object.entries(zmienne)) {
            (obj[key].details ??= {}).zmienne = value
        }
        for (let [key, value] of Object.entries(lata)) {
            (obj[key].details ??= {}).lata = value
        }

        delete obj.zmienne
        delete obj.lata

        for (let [key, value] of Object.entries(obj)) {
            obj[key] = {
                zmienne: obj[key].details.zmienne,
                lata: obj[key].details.lata,
                czasopisma: value
            }
            delete obj[key].czasopisma.details
        }
    }
}


exports.xml = new XMLDataParserService()