import { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useFirestore = (collectionName, options = {}) => {
    const [documents, setDocuments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        try {
            let q = collection(db, collectionName);

            // apply simple options: orderBy and where (options: { orderBy: ['field','asc'], where: ['field','==', value] })
            const constraints = [];
            if (options.where && Array.isArray(options.where)) {
                const [field, op, value] = options.where;
                constraints.push(where(field, op, value));
            }
            if (options.orderBy && Array.isArray(options.orderBy)) {
                const [field, direction] = options.orderBy;
                constraints.push(orderBy(field, direction || 'asc'));
            }
            if (constraints.length) q = query(q, ...constraints);

            const unsub = onSnapshot(
                q,
                (snapshot) => {
                    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setDocuments(docs);
                    setLoading(false);
                },
                (err) => {
                    setError(err);
                    setLoading(false);
                }
            );

            return () => unsub();
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }, [collectionName, JSON.stringify(options)]);

    return { documents, loading, error };
};