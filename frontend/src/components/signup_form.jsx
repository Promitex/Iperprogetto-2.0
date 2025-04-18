import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DynamicSignupForm = () => {
    const [accountType, setAccountType] = useState('');
    const [accountDetail, setAccountDetail] = useState('');
    const [accountDetailsOptions, setAccountDetailsOptions] = useState([]);
    const [dynamicFields, setDynamicFields] = useState([]);
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        username: '',
        email: '',
        confirm_email: '',
        password: '',
        confirm_password: '',
        codice_iscrizione: '',
        privacy_agreement: false,
    });
    const [errors, setErrors] = useState({});
    const [signupMessage, setSignupMessage] = useState('');

    const accountDetailsMap = {
        professionista: ['Singolo professionista', 'Studio professionale'],
        azienda: ['Azienda o impresa'],
    };

    const fieldMappings = {
        'Singolo professionista': [
            { label: 'Professione*', type: 'select', name: 'select_professione', options: ['Architetto', 'Ingegnere', 'Geometra'] }, // Sostituisci con dati reali da API se necessario
            { label: 'Telefono/Cellulare', type: 'tel', name: 'billing_phone', maxLength: '10' },
        ],
        'Studio professionale': [
            { label: 'Tipologia Studio*', type: 'select', name: 'select_tipologia_studio', options: ['Associato', 'Individuale'] }, // Sostituisci con dati reali da API se necessario
            { label: 'Nome Referente*', type: 'text', name: 'billing_name', required: true },
            { label: 'Cognome Referente*', type: 'text', name: 'billing_surname', required: true },
            { label: 'Ragione Sociale*', type: 'text', name: 'billing_company', required: true },
            { label: 'E-mail Aziendale*', type: 'email', name: 'billing_email', required: true },
            { label: 'Telefono/Cellulare*', type: 'tel', name: 'billing_phone', required: true, maxLength: '10' },
            { label: 'Città', type: 'text', name: 'billing_city' },
        ],
        'Azienda o impresa': [
            { label: 'Tipologia Azienda*', type: 'select', name: 'select_tipologia_azienda', options: ['SRL', 'SPA', 'Altro'] }, // Sostituisci con dati reali da API se necessario
            { label: 'Nome Azienda*', type: 'text', name: 'nome_azienda', required: true },
            { label: 'Nome Referente*', type: 'text', name: 'billing_name', required: true },
            { label: 'Cognome Referente*', type: 'text', name: 'billing_surname', required: true },
            { label: 'E-mail Aziendale*', type: 'email', name: 'billing_email', required: true },
            { label: 'Telefono/Cellulare*', type: 'tel', name: 'billing_phone', required: true, maxLength: '10' },
            { label: 'Città', type: 'text', name: 'billing_city' },
        ],
    };

    useEffect(() => {
        setAccountDetailsOptions(accountDetailsMap[accountType] || []);
        setAccountDetail(''); // Resetta la selezione del dettaglio
        setDynamicFields([]); // Resetta i campi dinamici
    }, [accountType]);

    useEffect(() => {
        if (accountDetail) {
            setDynamicFields(fieldMappings[accountDetail] || []);
        } else {
            setDynamicFields([]);
        }
    }, [accountDetail]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' })); // Cancella l'errore al cambio
    };

    const handleAccountTypeChange = (e) => {
        setAccountType(e.target.value);
    };

    const handleAccountDetailChange = (e) => {
        setAccountDetail(e.target.value);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;
        const newErrors = {};

        // Validazioni di base (aggiungi le tue logiche complete)
        if (!formData.nome) newErrors.nome = 'Il nome è richiesto.';
        if (!formData.cognome) newErrors.cognome = 'Il cognome è richiesto.';
        if (!formData.username) newErrors.username = 'Il nome utente è richiesto.';
        if (!formData.email) newErrors.email = 'L\'email è richiesta.';
        else if (!validateEmail(formData.email)) newErrors.email = 'Email non valida.';
        if (formData.email !== formData.confirm_email) newErrors.confirm_email = 'Le email non corrispondono.';
        if (!formData.password) newErrors.password = 'La password è richiesta.';
        else if (!validatePassword(formData.password)) newErrors.password = 'La password deve essere di almeno 6 caratteri.';
        if (formData.password !== formData.confirm_password) newErrors.confirm_password = 'Le password non corrispondono.';
        if (!accountType) newErrors.accountType = 'Seleziona la tipologia di account.';
        if (accountDetailsOptions.length > 0 && !accountDetail) newErrors.accountDetail = 'Seleziona il dettaglio dell\'account.';
        if (!formData.privacy_agreement) newErrors.privacy_agreement = 'Devi accettare l\'informativa sulla privacy.';

        // Validazione dei campi dinamici (esempio)
        dynamicFields.forEach(field => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `Il campo ${field.label.replace('*', '')} è richiesto.`;
            }
            // Aggiungi qui altre validazioni specifiche per i campi dinamici
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            isValid = false;
            return;
        }

        try {
            const response = await axios.post('/api/register', formData); // Assicurati che questa sia la tua route Laravel
            setSignupMessage('Registrazione avvenuta con successo!');
            setErrors({});
            setFormData({ // Resetta il form
                nome: '',
                cognome: '',
                username: '',
                email: '',
                confirm_email: '',
                password: '',
                confirm_password: '',
                codice_iscrizione: '',
                privacy_agreement: false,
            });
            setAccountType('');
            setAccountDetail('');
            setDynamicFields([]);
        } catch (error) {
            console.error('Errore durante la registrazione:', error.response ? error.response.data : error.message);
            setSignupMessage(`Errore durante la registrazione: ${error.response?.data?.message || error.message}`);
            setErrors(error.response?.data?.errors || {}); // Mostra gli errori dal backend se presenti
        }
    };

    const handleVerifyUsername = async (username) => {
        if (username) {
            try {
                const response = await axios.post('/api/verify-username', { username }); // Assicurati che questa sia la tua route Laravel
                if (response.data.exists) {
                    setErrors(prevErrors => ({ ...prevErrors, username: 'Questo nome utente è già in uso.' }));
                } else {
                    setErrors(prevErrors => ({ ...prevErrors, username: '' }));
                }
            } catch (error) {
                console.error('Errore durante la verifica del nome utente:', error);
            }
        } else {
            setErrors(prevErrors => ({ ...prevErrors, username: 'Il nome utente è richiesto.' }));
        }
    };

    const handleVerifyEmail = async (email) => {
        if (email) {
            try {
                const response = await axios.post('/api/verify-email', { email }); // Assicurati che questa sia la tua route Laravel
                if (response.data.exists) {
                    setErrors(prevErrors => ({ ...prevErrors, email: 'Questa email è già registrata.' }));
                } else {
                    setErrors(prevErrors => ({ ...prevErrors, email: '' }));
                }
            } catch (error) {
                console.error('Errore durante la verifica dell\'email:', error);
            }
        } else {
            setErrors(prevErrors => ({ ...prevErrors, email: 'L\'email è richiesta.' }));
        }
    };

    return (
        <div className="iperprogetto-signup-container">
            <div className="iperprogetto-signup-header">
                <img src="/path/to/iperprogetto-logo.png" alt="Logo Iperprogetto" style={{ maxWidth: '150px' }} /> {/* Aggiorna il percorso del logo */}
                <h2>Registrati</h2>
                <p>Scegli la tipologia di account idoneo alle tue esigenze</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="select_type_account">Come vuoi iscriverti?*</label>
                    <select id="select_type_account" name="select_type_account" value={accountType} onChange={handleAccountTypeChange} required>
                        <option value="" disabled>Seleziona tipologia account</option>
                        <option value="professionista">Professionista</option>
                        <option value="azienda">Azienda o Impresa</option>
                    </select>
                    {errors.accountType && <span className="error-message">{errors.accountType}</span>}
                </div>

                {accountDetailsOptions.length > 0 && (
                    <div className="form-row">
                        <label htmlFor="select_account_detail">Seleziona dettaglio account*</label>
                        <select id="select_account_detail" name="select_account_detail" value={accountDetail} onChange={handleAccountDetailChange} required>
                            <option value="" disabled>Seleziona...</option>
                            {accountDetailsOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {errors.accountDetail && <span className="error-message">{errors.accountDetail}</span>}
                    </div>
                )}

                {dynamicFields.map(field => (
                    <div className="form-row" key={field.name}>
                        <label htmlFor={field.name}>{field.label}</label>
                        {field.type === 'select' ? (
                            <select id={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} required={field.required}>
                                <option value="" disabled>Seleziona...</option>
                                {field.options && field.options.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required={field.required}
                                maxLength={field.maxLength}
                            />
                        )}
                        {errors[field.name] && <span className="error-message">{errors[field.name]}</span>}
                    </div>
                ))}

                <div className="form-row">
                    <label htmlFor="nome">Nome*</label>
                    <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                    {errors.nome && <span className="error-message">{errors.nome}</span>}
                </div>
                <div className="form-row">
                    <label htmlFor="cognome">Cognome*</label>
                    <input type="text" id="cognome" name="cognome" value={formData.cognome} onChange={handleChange} required />
                    {errors.cognome && <span className="error-message">{errors.cognome}</span>}
                </div>
                <div className="form-row">
                    <label htmlFor="username">Nome Utente*</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        onBlur={(e) => handleVerifyUsername(e.target.value)}
                        required
                    />
                    {errors.username && <span className="error-message">{errors.username}</span>}
                </div>
                <div className="form-row">
                    <label htmlFor="email">Indirizzo e-mail*</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={(e) => handleVerifyEmail(e.target.value)}
                        required
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-row">
                    <label htmlFor="confirm_email">Conferma indirizzo e-mail*</label>
                    <input
                        type="email"
                        id="confirm_email"
                        name="confirm_email"
                        value={formData.confirm_email}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirm_email && <span className="error-message">{errors.confirm_email}</span>}
                </div>
                <div className="form-row">
                    <label htmlFor="password">Crea una password*</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <div className="form-row">
                    <label htmlFor="confirm_password">Conferma password*</label>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirm_password && <span className="error-message">{errors.confirm_password}</span>}
                </div>

                <div className="form-row">
                    <label htmlFor="codice_iscrizione">Hai un Codice di Convenzione o di Riferimento?</label>
                    <input
                        type="text"
                        id="codice_iscrizione"
                        name="codice_iscrizione"
                        value={formData.codice_iscrizione}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row terms-privacy">
                    <label>
                        <input
                            type="checkbox"
                            name="privacy_agreement"
                            checked={formData.privacy_agreement}
                            onChange={handleChange}
                            required
                        />
                        <span style={{ fontSize: '12px' }}>
                            Dichiaro di aver preso visione dell’<a href="/privacy-policy" target="_blank">
                                <strong><u>Informativa Privacy</u></strong>
                            </a> e ACCONSENTO al trattamento dei miei dati per finalità di marketing da parte di Iperprogetto.
                        </span>
                        {errors.privacy_agreement && <span className="error-message">{errors.privacy_agreement}</span>}
                    </label>
                </div>

                <div className="form-row submit-row">
                    <button type="submit" className="button_next">Registrati</button>
                </div>

                <div className="form-row login-link">
                    <label className="hai-gia-un-account">
                        Hai già un account? <a href="/login" style={{ color: '#4264AC' }}>
                            <strong>Accedi</strong>
                        </a>
                    </label>
                </div>
                {signupMessage && (
                    <div className={`signup-message ${Object.keys(errors).length === 0 ? 'success' : 'error'}`}>
                        {signupMessage}
                    </div>
                )}
            </form>
        </div>
    );
};

export default DynamicSignupForm;
