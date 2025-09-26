import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [formData, setFormData] = useState({ nome: '', telefone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'telefone') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 11) {
        formattedValue = formattedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (formattedValue.length >= 7) {
        formattedValue = formattedValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (formattedValue.length >= 3) {
        formattedValue = formattedValue.replace(/(\d{2})(\d{0,5})/, '($1) $2');
      }
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/salvar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowGuide(true);
          setShowSuccess(false);
        }, 2000);
      } else {
        alert('Erro ao enviar dados. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar dados. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Milena Rocha Nails Design - Guia Completo de Unhas Profissional</title>
        <meta name="description" content="Descubra os segredos de uma nail designer profissional com 8+ anos de experiência. Técnicas exclusivas de acrílico, gel e esmaltação que garantem unhas perfeitas por semanas." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600;700&family=Merriweather:wght@300;400;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        :root {
          --primary: #ff6b9d;
          --primary-dark: #e55a87;
          --primary-light: #ffa6c9;
          --secondary: #c44569;
          --accent: #ffeaa7;
          --accent-dark: #fdcb6e;
          --background: #f8f3f6;
          --background-alt: #faf7f9;
          --white: #ffffff;
          --text: #2d2d2d;
          --text-light: #666666;
          --text-lighter: #999999;
          --shadow-light: rgba(255, 107, 157, 0.1);
          --shadow-medium: rgba(0, 0, 0, 0.1);
          --shadow-strong: rgba(0, 0, 0, 0.15);
          --neu-shadow: 20px 20px 60px #d9d4d7, -20px -20px 60px #ffffff;
          --neu-shadow-inset: inset 20px 20px 60px #d9d4d7, inset -20px -20px 60px #ffffff;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, var(--background) 0%, var(--background-alt) 50%, #fef0f5 100%);
          min-height: 100vh;
          line-height: 1.6;
          color: var(--text);
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Neomorphic Elements */
        .neu-card {
          background: var(--background);
          border-radius: 30px;
          box-shadow: var(--neu-shadow);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .neu-input {
          background: var(--background);
          box-shadow: inset 8px 8px 16px #e0dade, inset -8px -8px 16px #ffffff;
          border: none;
          border-radius: 20px;
        }

        .neu-button {
          background: linear-gradient(145deg, var(--primary-light), var(--primary));
          box-shadow: 10px 10px 30px var(--shadow-light), -10px -10px 30px rgba(255, 255, 255, 0.5);
          border: none;
          border-radius: 25px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .neu-button:hover {
          box-shadow: 5px 5px 15px var(--shadow-light), -5px -5px 15px rgba(255, 255, 255, 0.8);
          transform: translateY(-2px);
        }

        .neu-button:active {
          box-shadow: inset 5px 5px 15px var(--shadow-light), inset -5px -5px 15px rgba(255, 255, 255, 0.8);
          transform: translateY(0);
        }

        /* Header */
        .header {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, #8e44ad 100%);
          padding: 3rem 0;
          position: relative;
          overflow: hidden;
        }

        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .header-content {
          text-align: center;
          color: white;
          position: relative;
          z-index: 2;
        }

        .logo {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-family: 'Dancing Script', cursive;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .subtitle {
          font-size: 1.2rem;
          font-family: 'Merriweather', serif;
          font-style: italic;
          opacity: 0.95;
          font-weight: 300;
        }

        /* Hero Section */
        .hero {
          padding: 5rem 0 4rem;
          text-align: center;
          position: relative;
        }

        .hero-content {
          max-width: 900px;
          margin: 0 auto;
        }

        .hero h1 {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-family: 'Playfair Display', serif;
          color: var(--text);
          line-height: 1.1;
          font-weight: 800;
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
        }

        .hero-highlight {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          color: var(--text-light);
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin: 3rem 0;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
          padding: 1.5rem;
          background: var(--white);
          border-radius: 20px;
          box-shadow: var(--neu-shadow);
          min-width: 150px;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary);
          font-family: 'Inter', sans-serif;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--text-light);
          font-weight: 500;
          margin-top: 0.5rem;
        }

        /* Capture Section */
        .capture-section {
          max-width: 700px;
          margin: 0 auto 4rem;
          padding: 4rem 3rem;
        }

        .capture-content {
          text-align: center;
        }

        .capture-badge {
          display: inline-block;
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(253, 203, 110, 0.3);
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .capture-title {
          font-size: 2.8rem;
          font-family: 'Playfair Display', serif;
          color: var(--text);
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .capture-subtitle {
          font-size: 1.2rem;
          color: var(--text-light);
          margin-bottom: 3rem;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        /* Form */
        .form-container {
          max-width: 450px;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 1.5rem;
          position: relative;
        }

        .form-group input {
          width: 100%;
          padding: 1.5rem 2rem;
          font-size: 1.1rem;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Inter', sans-serif;
          color: var(--text);
          font-weight: 500;
        }

        .form-group input:focus {
          box-shadow: inset 8px 8px 16px #e0dade, inset -8px -8px 16px #ffffff, 0 0 0 3px var(--shadow-light);
        }

        .form-group input::placeholder {
          color: var(--text-lighter);
          font-weight: 400;
        }

        .submit-btn {
          width: 100%;
          padding: 1.5rem 2rem;
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
          cursor: pointer;
          margin-top: 1.5rem;
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Success Message */
        .success-message {
          background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
          color: white;
          padding: 2.5rem;
          border-radius: 25px;
          animation: successPulse 0.6s ease;
          text-align: center;
        }

        .success-message h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
          font-family: 'Playfair Display', serif;
        }

        .success-message p {
          font-size: 1.1rem;
          font-family: 'Inter', sans-serif;
        }

        @keyframes successPulse {
          0% { opacity: 0; transform: scale(0.8) translateY(-20px); }
          50% { transform: scale(1.05) translateY(-10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Guide Section */
        .guide-section {
          padding: 6rem 0;
          background: radial-gradient(circle at 50% 50%, rgba(255, 107, 157, 0.03) 0%, transparent 50%);
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-family: 'Playfair Display', serif;
          text-align: center;
          margin-bottom: 1.5rem;
          color: var(--text);
          font-weight: 800;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.3rem;
          color: var(--text-light);
          margin-bottom: 4rem;
          font-family: 'Inter', sans-serif;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 3rem;
          margin-top: 4rem;
        }

        .card {
          padding: 3rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, var(--primary-light) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 1;
        }

        .card:hover::before {
          opacity: 0.1;
        }

        .card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 60px var(--shadow-strong);
        }

        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .card-icon {
          font-size: 4rem;
          margin-right: 1.5rem;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));
        }

        .card h3 {
          font-size: 2.2rem;
          font-family: 'Playfair Display', serif;
          color: var(--text);
          font-weight: 700;
          line-height: 1.2;
        }

        .card-content {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--text);
          position: relative;
          z-index: 2;
          font-family: 'Inter', sans-serif;
        }

        .section-header {
          color: var(--primary);
          font-weight: 700;
          display: block;
          margin: 2rem 0 1rem;
          font-size: 1.2rem;
          font-family: 'Poppins', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-content ul {
          margin: 1rem 0 2rem 1.5rem;
        }

        .card-content li {
          margin-bottom: 0.8rem;
          position: relative;
          padding-left: 0.5rem;
        }

        .card-content li::before {
          content: "✨";
          position: absolute;
          left: -1.5rem;
          top: 0;
        }

        .tip-box {
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(196, 69, 105, 0.1) 100%);
          padding: 1.5rem;
          border-radius: 15px;
          margin: 1.5rem 0;
          border-left: 4px solid var(--primary);
          position: relative;
        }

        .tip-box::before {
          content: "💡";
          position: absolute;
          top: -10px;
          left: 15px;
          background: var(--white);
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 1.2rem;
        }

        .warning-box {
          background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%);
          padding: 1.5rem;
          border-radius: 15px;
          margin: 1.5rem 0;
          border-left: 4px solid #ffc107;
          position: relative;
        }

        .warning-box::before {
          content: "⚠️";
          position: absolute;
          top: -10px;
          left: 15px;
          background: var(--white);
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 1.2rem;
        }

        .problem-solution {
          background: var(--background-alt);
          padding: 1.5rem;
          border-radius: 15px;
          margin: 1rem 0;
          border-left: 4px solid #28a745;
        }

        .problem-title {
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.5rem;
          font-family: 'Poppins', sans-serif;
        }

        /* Footer */
        .footer {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);
          color: white;
          padding: 4rem 0 2rem;
          margin-top: 6rem;
          position: relative;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="footerGrain" width="50" height="50" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="40" cy="25" r="0.3" fill="rgba(255,255,255,0.03)"/></pattern></defs><rect width="100" height="100" fill="url(%23footerGrain)"/></svg>');
          opacity: 0.5;
        }

        .footer-content {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          z-index: 2;
        }

        .footer-section h3 {
          font-size: 2.5rem;
          font-family: 'Dancing Script', cursive;
          margin-bottom: 1.5rem;
          color: var(--primary-light);
        }

        .footer-section p {
          max-width: 700px;
          margin: 0 auto 2rem;
          line-height: 1.8;
          opacity: 0.9;
          font-size: 1.1rem;
          font-family: 'Inter', sans-serif;
        }

        .social-links {
          margin-top: 2rem;
        }

        .social-links a {
          color: var(--primary-light);
          text-decoration: none;
          font-size: 1.3rem;
          font-weight: 600;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          padding: 1rem 2rem;
          border-radius: 25px;
          background: rgba(255, 107, 157, 0.1);
          display: inline-block;
        }

        .social-links a:hover {
          color: var(--white);
          background: var(--primary);
          transform: translateY(-2px);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 2rem;
          text-align: center;
          opacity: 0.7;
          position: relative;
          z-index: 2;
          font-family: 'Inter', sans-serif;
        }

        /* Responsivo */
        @media (max-width: 768px) {
          .cards-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .capture-section {
            margin: 0 20px 3rem;
            padding: 3rem 2rem;
          }

          .hero h1 {
            padding: 0 20px;
          }

          .hero-stats {
            gap: 1.5rem;
          }

          .stat-item {
            min-width: 120px;
            padding: 1rem;
          }

          .card-header {
            flex-direction: column;
            text-align: center;
          }

          .card-icon {
            margin-right: 0;
            margin-bottom: 1rem;
          }
        }
      `}</style>

      <main>
        {/* Header */}
        <header className="header">
          <div className="container">
            <div className="header-content">
              <h1 className="logo">Milena Rocha Nails Design</h1>
              <p className="subtitle">Transformando suas unhas em verdadeiras obras de arte há mais de 8 anos</p>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1>Descubra os <span className="hero-highlight">segredos profissionais</span> para unhas que <span className="hero-highlight">duram semanas</span> sem descascar</h1>
              <p className="hero-subtitle">
                Mais de 15.000 clientes já transformaram suas unhas com as técnicas exclusivas que desenvolvi ao longo de 8 anos como nail designer especializada. Agora você também pode ter acesso a todos esses segredos.
              </p>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">15k+</div>
                  <div className="stat-label">Clientes Satisfeitas</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">8</div>
                  <div className="stat-label">Anos de Experiência</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">3-4</div>
                  <div className="stat-label">Semanas de Duração</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formulário de Captura */}
        <section className="capture-section neu-card">
          <div className="capture-content">
            <span className="capture-badge">🎁 Acesso Exclusivo Gratuito</span>
            <h2 className="capture-title">Receba o Guia Completo Agora</h2>
            <p className="capture-subtitle">
              Aprenda as técnicas secretas que uso no meu salão todos os dias. Métodos testados e aprovados por milhares de clientes ao longo de quase uma década de experiência.<br />
              <strong>100% Gratuito • Acesso Imediato • Conteúdo Exclusivo</strong>
            </p>
            
            {!showSuccess && !showGuide && (
              <div className="form-container">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="nome"
                      placeholder="Como posso te chamar?"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                      className="neu-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="tel"
                      name="telefone"
                      placeholder="Seu WhatsApp para receber dicas exclusivas"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                      className="neu-input"
                    />
                  </div>
                  
                  <button type="submit" className="submit-btn neu-button" disabled={isLoading}>
                    {isLoading ? '⏳ Preparando seu guia...' : '🎯 Quero Acesso Ao Guia Exclusivo'}
                  </button>
                </form>
              </div>
            )}

            {showSuccess && (
              <div className="success-message">
                <h3>🎉 Perfeito!</h3>
                <p>Seu guia exclusivo está sendo preparado com todo carinho. Em instantes você terá acesso a todos os meus segredos profissionais!</p>
              </div>
            )}
          </div>
        </section>

        {/* Guia Completo - Mostra após formulário */}
        {showGuide && (
          <section className="guide-section">
            <div className="container">
              <h2 className="section-title">🎁 Seu Guia Exclusivo de Nail Design</h2>
              <p className="section-subtitle">Parabéns! Agora você tem acesso aos mesmos segredos que uso com minhas clientes VIP. Prepare-se para revolucionar suas unhas!</p>
              
              <div className="cards-grid">
                {/* Card 1: Unhas em Acrílico Profissionais */}
                <div className="card neu-card">
                  <div className="card-header">
                    <span className="card-icon">💎</span>
                    <h3>Unhas em Acrílico Profissionais</h3>
                  </div>
                  <div className="card-content">
                    <span className="section-header">🏆 Por que o acrílico é minha técnica favorita</span>
                    <p>Depois de 8 anos testando todas as técnicas possíveis, posso afirmar: o acrílico bem aplicado é imbatível em durabilidade e versatilidade. Aqui estão os motivos pelos quais 70% das minhas clientes escolhem acrílico:</p>
                    <ul>
                      <li><strong>Resistência incomparável:</strong> Suporta atividades intensas sem quebrar - perfeito para mães, profissionais ativas e esportistas</li>
                      <li><strong>Durabilidade de 3-4 semanas:</strong> Investimento que compensa, pois dura muito mais que esmaltes convencionais</li>
                      <li><strong>Base perfeita para nail art:</strong> Permite criar designs 3D, encapsulados e efeitos impossíveis em outras técnicas</li>
                      <li><strong>Formato customizável:</strong> Posso esculpir exatamente o formato dos seus sonhos</li>
                      <li><strong>Secagem natural:</strong> Não precisa de cabine UV, seca sozinho em poucos minutos</li>
                    </ul>
                    
                    <span className="section-header">🔧 Segredos de Cuidados que Aperfeiçoei</span>
                    <p>Estas são as técnicas que desenvolvi ao longo dos anos observando o que realmente funciona:</p>
                    <ul>
                      <li><strong>Regra das luvas obrigatórias:</strong> Para limpeza pesada, jardinagem e contato com produtos químicos - isso multiplica a durabilidade por 3</li>
                      <li><strong>Hidratação estratégica:</strong> Uma gota de óleo de cutícula na lateral das unhas antes de dormir previne 90% das rachaduras</li>
                      <li><strong>A regra de ouro:</strong> JAMAIS use as unhas como ferramentas - ensinei isso para mais de 15.000 clientes</li>
                      <li><strong>Cronograma de manutenção:</strong> Retoque a cada 15-20 dias mantém a perfeição sem estresse</li>
                      <li><strong>Remoção profissional obrigatória:</strong> Economizar na remoção pode custar meses de recuperação da unha natural</li>
                    </ul>

                    <div className="tip-box">
                      <p><strong>Dica VIP que mudou a vida das minhas clientes:</strong> Aplique óleo de cutícula nas laterais das unhas toda noite. Esse simples hábito mantém a flexibilidade do acrílico e evita aquelas rachaduras chatas que sempre aparecem nos cantos.</p>
                    </div>
                  </div>
                </div>

                {/* Card 2: Alongamento em Gel de Qualidade Superior */}
                <div className="card neu-card">
                  <div className="card-header">
                    <span className="card-icon">✨</span>
                    <h3>Alongamento em Gel de Qualidade Superior</h3>
                  </div>
                  <div className="card-content">
                    <span className="section-header">🌟 Quando o gel é a escolha perfeita</span>
                    <p>O gel é minha segunda técnica mais requisitada, especialmente para clientes que valorizam naturalidade e flexibilidade. Após milhares de aplicações, descobri exatamente quando recomendá-lo:</p>
                    <ul>
                      <li><strong>Visual ultra natural:</strong> Movimento flexível que imita perfeitamente a unha natural</li>
                      <li><strong>Menos invasivo:</strong> Ideal para quem tem unha natural sensível ou danificada</li>
                      <li><strong>Secagem instantânea:</strong> Com cabine LED profissional, você sai do salão com unhas completamente curadas</li>
                      <li><strong>Brilho duradouro:</strong> Mantém aquele acabamento de "recém-feita" por semanas</li>
                      <li><strong>Versatilidade incrível:</strong> Desde um nude elegante até nail arts elaboradas</li>
                    </ul>
                    
                    <span className="section-header">🛠️ Protocolo de Manutenção Profissional</span>
                    <p>Estes são os cuidados que ensino para minhas clientes VIP manterem o gel perfeito:</p>
                    <ul>
                      <li><strong>Cronograma sagrado:</strong> Retoque profissional a cada 2-3 semanas - não negocie essa data</li>
                      <li><strong>Base fortalecedora entre aplicações:</strong> Uso este truque há anos para manter a unha natural saudável</li>
                      <li><strong>Fuja da acetona pura:</strong> Use sempre removedor sem acetona para limpeza diária</li>
                      <li><strong>Hidratação intensiva:</strong> Cremes específicos para unhas em gel fazem toda a diferença</li>
                      <li><strong>Remoção técnica:</strong> Só profissionais sabem fazer o lixamento suave necessário</li>
                    </ul>

                    <div className="warning-box">
                      <p><strong>Alerta profissional:</strong> Se notar qualquer descolamento nas bordas, procure um profissional IMEDIATAMENTE. Nunca puxe ou tente forçar a remoção - já vi casos de danos irreversíveis por conta disso.</p>
                    </div>
                  </div>
                </div>

                {/* Card 3: Esmaltação Profissional Duradoura */}
                <div className="card neu-card">
                  <div className="card-header">
                    <span className="card-icon">🎨</span>
                    <h3>Esmaltação Profissional Duradoura</h3>
                  </div>
                  <div className="card-content">
                    <span className="section-header">🎯 A preparação que faz toda a diferença</span>
                    <p>O segredo de uma esmaltação que dura 10+ dias não está no esmalte, mas na preparação. Aqui está meu protocolo completo desenvolvido ao longo de anos:</p>
                    <ul>
                      <li><strong>Limpeza total:</strong> Remoção completa do esmalte anterior com algodão de qualidade e removedor profissional</li>
                      <li><strong>Cutículas perfeitas:</strong> Empurrar (nunca cortar em excesso) após amolecimento com produtos específicos</li>
                      <li><strong>Formato estratégico:</strong> Lima sempre em movimentos unidirecionais - truque que poucos conhecem</li>
                      <li><strong>Desengorduramento crucial:</strong> Álcool 70% ou primer elimina oleosidade que causa descamação</li>
                      <li><strong>Base adequada:</strong> Cada tipo de unha precisa de uma base específica - não existe fórmula única</li>
                    </ul>
                    
                    <span className="section-header">🎨 Técnica de Aplicação Profissional</span>
                    <p>Esta técnica levei anos para dominar e agora ensino para vocês:</p>
                    <ul>
                      <li><strong>Regra das 3 pinceladas:</strong> Centro primeiro, depois laterais - nunca mais que isso</li>
                      <li><strong>Camadas ultra finas:</strong> Melhor 3 camadas finas que 1 grossa que descasca</li>
                      <li><strong>Paciência na secagem:</strong> 2-3 minutos entre camadas evita bolhas e imperfeições</li>
                      <li><strong>Fórmula sagrada:</strong> Base + 2 camadas de cor + top coat = durabilidade garantida</li>
                      <li><strong>Finalização luxuosa:</strong> Óleo de cutícula no final sela a perfeição</li>
                    </ul>

                    <span className="section-header">🔒 Segredos para Durabilidade de 10+ Dias</span>
                    <p>Estes truques fazem a diferença entre esmalte que dura 3 dias e 10+ dias:</p>
                    <ul>
                      <li><strong>Primeiras 4 horas críticas:</strong> Evite água muito quente que pode causar micro rachaduras</li>
                      <li><strong>Proteção constante:</strong> Luvas para lavar louça e contato com produtos químicos</li>
                      <li><strong>Renovação do top coat:</strong> Reaplicar a cada 2-3 dias mantém brilho e proteção</li>
                      <li><strong>Hidratação diária:</strong> Cutículas hidratadas = esmalte que não racha</li>
                      <li><strong>Movimento consciente:</strong> Treine usar a polpa dos dedos, não as unhas</li>
                    </ul>

                    <div className="tip-box">
                      <p><strong>Segredo profissional exclusivo:</strong> Antes de aplicar qualquer esmalte, passe um cotonete com álcool na unha limpa. Isso remove oleosidade microscópica que é invisível mas fatal para a aderência.</p>
                    </div>
                  </div>
                </div>

                {/* Card 4: Solucionando Problemas Comuns */}
                <div className="card neu-card">
                  <div className="card-header">
                    <span className="card-icon">🔧</span>
                    <h3>Solucionando Problemas Comuns</h3>
                  </div>
                  <div className="card-content">
                    <span className="section-header">🚨 Diagnóstico e Soluções Profissionais</span>
                    <p>Depois de atender mais de 15.000 clientes, já vi e resolvi todos os problemas possíveis. Aqui estão as soluções que realmente funcionam:</p>
                    
                    <div className="problem-solution">
                      <div className="problem-title">💔 Esmalte descascando em 2-3 dias</div>
                      <ul>
                        <li>✅ <strong>Diagnóstico:</strong> Preparação inadequada da unha (95% dos casos)</li>
                        <li>✅ <strong>Solução imediata:</strong> Sempre use base + 2 camadas + top coat</li>
                        <li>✅ <strong>Prevenção:</strong> Desengordue com álcool antes da base</li>
                        <li>✅ <strong>Dica extra:</strong> Evite cremes nas mãos 2 horas antes de esmaltar</li>
                      </ul>
                    </div>

                    <div className="problem-solution">
                      <div className="problem-title">🫧 Bolhas no esmalte</div>
                      <ul>
                        <li>✅ <strong>Causa principal:</strong> Pressa na aplicação ou temperatura ambiente alta</li>
                        <li>✅ <strong>Solução técnica:</strong> Camadas mais finas e paciência entre elas</li>
                        <li>✅ <strong>Truque profissional:</strong> Gire o frasco entre as palmas (nunca balance)</li>
                        <li>✅ <strong>Ambiente ideal:</strong> Local com temperatura amena e sem ventilação direta</li>
                      </ul>
                    </div>

                    <div className="problem-solution">
                      <div className="problem-title">🌵 Cutículas sempre ressecadas</div>
                      <ul>
                        <li>✅ <strong>Rotina salvadora:</strong> Óleo de cutícula 2x ao dia religiosamente</li>
                        <li>✅ <strong>Produto certo:</strong> Hidratante específico para mãos, não body lotion</li>
                        <li>✅ <strong>Erro fatal:</strong> Nunca retire cutículas completamente secas</li>
                        <li>✅ <strong>Tratamento intensivo:</strong> Compressas de óleo morno 1x por semana</li>
                      </ul>
                    </div>

                    <div className="problem-solution">
                      <div className="problem-title">🪶 Unhas quebradiças e fracas</div>
                      <ul>
                        <li>✅ <strong>Base fortalecedora:</strong> 3x por semana durante 2 meses</li>
                        <li>✅ <strong>Suplementação:</strong> Biotina conforme orientação médica</li>
                        <li>✅ <strong>Lima adequada:</strong> Vidro ou metal fino, nunca lixas grossas</li>
                        <li>✅ <strong>Pausa estratégica:</strong> 1 semana sem esmalte a cada 2 meses</li>
                      </ul>
                    </div>

                    <div className="warning-box">
                      <p><strong>Quando buscar ajuda profissional:</strong> Se os problemas persistem mesmo seguindo todas as dicas, pode haver questões de saúde subjacentes. Não hesite em consultar um dermatologista.</p>
                    </div>
                  </div>
                </div>

                {/* Card 5: Kit Essencial Profissional */}
                <div className="card neu-card">
                  <div className="card-header">
                    <span className="card-icon">🎁</span>
                    <h3>Kit Essencial Profissional</h3>
                  </div>
                  <div className="card-content">
                    <span className="section-header">🧰 Ferramentas que uso todos os dias</span>
                    <p>Depois de testar centenas de produtos, estes são os itens indispensáveis que recomendo para todas as minhas clientes:</p>
                    <ul>
                      <li><strong>Lima de vidro (180/240):</strong> Investimento único que dura anos e não agride a unha</li>
                      <li><strong>Buffer profissional:</strong> Para selagem e brilho natural sem esmalte</li>
                      <li><strong>Espátula de cutícula de inox:</strong> Precisão e durabilidade incomparáveis</li>
                      <li><strong>Alicate pequeno e afiado:</strong> Marca profissional faz toda a diferença</li>
                      <li><strong>Separador de dedos:</strong> Silicone é mais confortável que espuma</li>
                    </ul>
                    
                    <span className="section-header">💄 Produtos que não podem faltar</span>
                    <p>Esta é minha lista personalizada baseada em 8 anos de experiência:</p>
                    <ul>
                      <li><strong>Base fortalecedora premium:</strong> Não economize aqui - é a base de tudo</li>
                      <li><strong>Top coat secagem rápida:</strong> Reduz tempo de espera e aumenta durabilidade</li>
                      <li><strong>Óleo de cutícula (amêndoa doce ou jojoba):</strong> Hidratação profunda sem oleosidade</li>
                      <li><strong>Removedor sem acetona:</strong> Preserva a unha natural e cutículas</li>
                      <li><strong>Algodão prensado e hastes flexíveis:</strong> Ferramentas básicas mas essenciais</li>
                    </ul>

                    <span className="section-header">🌈 Paleta de cores estratégica</span>
                    <p>Estas 5 cores cobrem 90% das ocasiões (testado com milhares de clientes):</p>
                    <ul>
                      <li><strong>Nude rosado:</strong> Elegância atemporal que combina com qualquer look</li>
                      <li><strong>Vermelho clássico:</strong> Poder e sofisticação para ocasiões especiais</li>
                      <li><strong>Branco cremoso:</strong> Base para francesinhas e nail arts</li>
                      <li><strong>Preto acetinado:</strong> Elegância moderna e versatilidade total</li>
                      <li><strong>Cor tendência atual:</strong> Para estar sempre na moda</li>
                    </ul>

                    <div className="tip-box">
                      <p><strong>Dica de investimento:</strong> Compre qualidade nas ferramentas básicas (lima, alicate, buffer). Elas duram anos e fazem diferença real no resultado. Nos esmaltes, você pode começar com marcas nacionais boas e ir evoluindo.</p>
                    </div>
                  </div>
                </div>

                {/* Card 6: Cuidados e Tratamentos Avançados */}
                <div className="card neu-card">
                  <div className="card-header">
                    <span className="card-icon">🌿</span>
                    <h3>Cuidados e Tratamentos Avançados</h3>
                  </div>
                  <div className="card-content">
                    <span className="section-header">💆‍♀️ Rotina de cuidados que prescrevo</span>
                    <p>Esta rotina foi desenvolvida ao longo de anos observando o que realmente funciona com minhas clientes mais exigentes:</p>
                    <ul>
                      <li><strong>Manhã:</strong> Hidratante com FPS 30+ nas mãos (proteção solar é crucial)</li>
                      <li><strong>Tarde:</strong> Reaplicação do hidratante após lavagem das mãos</li>
                      <li><strong>Noite:</strong> Óleo de cutícula + creme nutritivo com massagem circular</li>
                      <li><strong>Semanal:</strong> Esfoliação suave com açúcar cristal e mel</li>
                      <li><strong>Mensal:</strong> Hidratação intensiva overnight com luvas de algodão</li>
                    </ul>
                    
                    <span className="section-header">🏠 Receitas caseiras que funcionam</span>
                    <p>Testei dezenas de receitas caseiras. Estas são as únicas que realmente funcionam:</p>
                    <ul>
                      <li><strong>Fortalecedor natural:</strong> 2 colheres de azeite + 5 gotas de limão (1x semana, 15 min)</li>
                      <li><strong>Hidratação profunda:</strong> 1 colher de mel + 1 colher de aveia em pó para as mãos</li>
                      <li><strong>Clareamento suave:</strong> Bicarbonato + água oxigenada 10 volumes (máximo 1x mês)</li>
                      <li><strong>Crescimento:</strong> Massagem com óleo de rícino todas as noites por 30 dias</li>
                    </ul>

                    <span className="section-header">⚠️ Sinais de alerta profissional</span>
                    <p>Em 8 anos de experiência, aprendi a identificar quando é hora de procurar ajuda especializada:</p>
                    <ul>
                      <li><strong>Infecções ou inflamações:</strong> Vermelhidão, calor, inchaço ou pus</li>
                      <li><strong>Unhas encravadas recorrentes:</strong> Especialmente nas laterais</li>
                      <li><strong>Mudanças na cor ou textura:</strong> Manchas escuras, estrias ou espessamento</li>
                      <li><strong>Dor persistente:</strong> Desconforto que não melhora com cuidados básicos</li>
                      <li><strong>Reações alérgicas:</strong> Coceira, descamação ou irritação ao redor das unhas</li>
                    </ul>

                    <div className="warning-box">
                      <p><strong>Importante:</strong> Sou nail designer, não médica. Qualquer problema persistente ou preocupante deve ser avaliado por um dermatologista. A saúde das suas unhas é mais importante que a beleza!</p>
                    </div>

                    <div className="tip-box">
                      <p><strong>Segredo final:</strong> A unha perfeita é 70% cuidados diários e 30% técnica profissional. Invista no dia a dia e você verá resultados incríveis em poucas semanas!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}