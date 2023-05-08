import firebase from "../../firebase";
let db = firebase.firestore()

async function getFireBaseData(inputData) {
    return new Promise((resolve, reject) => {
        let query;
        let collectionName = inputData.collection;
        let conditions = inputData.conditions;
        if (inputData.conditions && typeof inputData.conditions == 'string') {
            conditions = JSON.parse(inputData.conditions);
        }
        let method = 'get';
        if (inputData.method) {
            method = inputData.method;
        }
        let limit = undefined;
        if (inputData.limit) {
            limit = parseInt(inputData.limit);
        }
        if (collectionName) {
            let docRef = undefined;

            if (inputData.collection) {
                docRef = db.collection(`${collectionName}`);
            } else {
                docRef = db.collection(`${collectionPath}/${collectionName}`);
            }
            if (conditions && conditions.length > 0) {
                conditions.forEach(element => {
                    // if (element.key == "timestamp" && element.value) {
                    //   element.value = moment(element.value).utc()._d;
                    // } else if (element.key == "messageid" && element.value) {
                    //   element.value = parseInt(element.value);
                    // }
                    docRef = docRef.where(element.key, element.symbol, element.value);
                });
            }
            if (limit) {
                docRef = docRef.limit(limit);
            }
            if (inputData.orderby) {
                docRef = docRef.orderBy(inputData.orderby, inputData.order);
            }
            query = docRef.get();
            query
                .then(snapshot => {
                    let promises = [];
                    if (snapshot.size != 0) {
                        snapshot.forEach(doc => {
                            let data = doc.data();
                            data.id = doc.id;
                            promises.push(data);
                        });
                    }
                    resolve({ data: promises, status: 'success' });
                })
                .catch(error => {
                    console.log('Error getting documents: ', error);
                    resolve({ message: 'Error getting documents', status: 'failure' });
                });
        } else {
            resolve({ message: 'Missing collectionName', status: 'failure' });
        }
    });
}

export {
    getFireBaseData
};
