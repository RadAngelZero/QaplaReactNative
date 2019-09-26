import { logrosActRef, logrosRef, cuentasVerificadasRef } from '../services/database';
import { LOAD_USER_VERIFICATION_STATUS, LOAD_LOGROS_ACTIVOS, REMOVE_LOGRO_ACTIVO, LOAD_LOGROS_COMPLETOS } from '../utilities/Constants';

export const loadQaplaLogros = (uid) => async (dispatch) => {
    cuentasVerificadasRef.child(uid).on('value', (verifiedAccount) => {
        if (verifiedAccount.exists()) {
            dispatch(checkIfIsUserVerifiedSuccess(true));
            dispatch(removeLogroFromActivos('Verification-Logro'));
        } else {
            dispatch(loadLogrosActivosSuccess({ tipoLogro: 'verifica', id: 'Verification-Logro' }));
            dispatch(checkIfIsUserVerifiedSuccess(false));
        }
    });
    
    logrosActRef.on('value', (logrosActivos) => {
        logrosActivos.forEach((logroActivoType) => {
            if (logroActivoType.key !== 'verifica') {
                logroActivoType.forEach((logroActivo) => {
                    const logroActivoObject = {
                        id: logroActivo.key,
                        ...logroActivo.val()
                    }
                    dispatch(loadLogrosActivosSuccess(logroActivoObject));
                });
            }
        });
        logrosRef.child(uid).child('logroIncompleto').on('value', (logrosIncompletos) => {
            if (logrosIncompletos.exists()) {
                logrosIncompletos.forEach((logroIncompleto) => {
                    const logroIncompletoObject = {
                        id: logroIncompleto.key,
                        ...logroIncompleto.val()
                    };
                    dispatch(loadLogrosActivosSuccess(logroIncompletoObject));
                });
            }
        });

        logrosRef.child(uid).child('logroCompleto').on('value', (logrosCompletos) => {
            if (logrosCompletos.exists()) {
                logrosCompletos.forEach((logroCompleto) => {
                    const logroCompletoObject = {
                        id: logroCompleto.key,
                        tipoLogro: 'completado',
                        ...logroCompleto.val()
                    }
                    dispatch(loadLogrosCompletosSuccess(logroCompletoObject));
                    dispatch(removeLogroFromActivos(logroCompleto.key));
                });
            }
        });
    });
}

const checkIfIsUserVerifiedSuccess = (payload) => {
    return {
        type: LOAD_USER_VERIFICATION_STATUS,
        payload
    }
}

const loadLogrosActivosSuccess = (payload) => {
    return {
        type: LOAD_LOGROS_ACTIVOS,
        payload
    }
}

const removeLogroFromActivos = (payload) => {
    return {
        type: REMOVE_LOGRO_ACTIVO,
        payload
    }
}

const loadLogrosCompletosSuccess = (payload) => {
    return {
        type: LOAD_LOGROS_COMPLETOS,
        payload
    }
}