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
        <title>Milena Rocha Nails Design - Guia Completo de Unhas</title>
        <meta name="description" content="Descubra os segredos para unhas perfeitas em acrílico, gel e esmaltação que duram mais com Milena Rocha Nails Design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 100%);
            min-height: 100vh;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          /* Header */
          .header {
            background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
            padding: 2rem 0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }

          .header-content {
            text-align: center;
            color: white;
          }

          .logo {
            font-size: 2.5rem;
            font-family: 'Playfair Display', serif;
            font-weight: 900;
            letter-spacing: -0.02em;
            margin-bottom: 0.5rem;
          }

          .subtitle {
            font-size: 1rem;
            opacity: 0.95;
          }

          /* Hero Section */
          .hero {
            padding: 4rem 0 3rem;
            text-align: center;
          }

          .hero h1 {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-family: 'Playfair Display', serif;
            color: #2d2d2d;
            line-height: 1.2;
            font-weight: 700;
          }

          .hero-highlight {
            background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          /* Capture Section */
          .capture-section {
            background: white;
            border-radius: 20px;
            max-width: 600px;
            margin: 0 auto 3rem;
            padding: 3rem 2rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }

          .capture-content {
            text-align: center;
          }

          .capture-badge {
            display: inline-block;
            background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
            padding: 0.5rem 1.5rem;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
          }

          .capture-title {
            font-size: 2rem;
            font-family: 'Playfair Display', serif;
            color: #2d2d2d;
            margin-bottom: 1rem;
          }

          .capture-subtitle {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 2rem;
            line-height: 1.6;
          }

          /* Form */
          .form-container {
            max-width: 400px;
            margin: 0 auto;
          }

          .form-group {
            margin-bottom: 1rem;
          }

          .form-group input {
            width: 100%;
            padding: 1rem 1.5rem;
            font-size: 1rem;
            border: 2px solid #f0f0f0;
            border-radius: 50px;
            outline: none;
            transition: all 0.3s ease;
            font-family: 'Poppins', sans-serif;
          }

          .form-group input:focus {
            border-color: #ff6b9d;
            box-shadow: 0 0 0 3px rgba(255,107,157,0.1);
          }

          .submit-btn {
            width: 100%;
            padding: 1.2rem 2rem;
            font-size: 1.1rem;
            font-weight: 600;
            color: white;
            background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 1rem;
            font-family: 'Poppins', sans-serif;
          }

          .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(255,107,157,0.3);
          }

          .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          /* Success Message */
          .success-message {
            background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            animation: fadeIn 0.5s ease;
          }

          .success-message h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Guide Section */
          .guide-section {
            padding: 4rem 0;
          }

          .section-title {
            font-size: 2.5rem;
            font-family: 'Playfair Display', serif;
            text-align: center;
            margin-bottom: 1rem;
            color: #2d2d2d;
          }

          .section-subtitle {
            text-align: center;
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 3rem;
          }

          .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
          }

          .card {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
          }

          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          }

          .card-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            display: block;
          }

          .card h3 {
            font-size: 1.8rem;
            font-family: 'Playfair Display', serif;
            margin-bottom: 1.5rem;
            color: #2d2d2d;
          }

          .card-content {
            font-size: 0.95rem;
            line-height: 1.8;
            color: #555;
          }

          .card-content strong {
            color: #ff6b9d;
            font-weight: 600;
            display: block;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }

          .card-content ul {
            margin-left: 1.5rem;
            margin-bottom: 1rem;
          }

          .card-content li {
            margin-bottom: 0.5rem;
          }

          /* Footer */
          .footer {
            background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
            color: white;
            padding: 3rem 0 1rem;
            margin-top: 5rem;
          }

          .footer-content {
            text-align: center;
            margin-bottom: 2rem;
          }

          .footer-section h3 {
            font-size: 1.8rem;
            font-family: 'Playfair Display', serif;
            margin-bottom: 1rem;
          }

          .footer-section p {
            max-width: 600px;
            margin: 0 auto 2rem;
            line-height: 1.6;
            opacity: 0.9;
          }

          .social-links {
            margin-top: 1.5rem;
          }

          .social-links a {
            color: #ff6b9d;
            text-decoration: none;
            font-size: 1.1rem;
            font-weight: 500;
            transition: color 0.3s ease;
          }

          .social-links a:hover {
            color: #ffa6c9;
          }

          .footer-bottom {
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 1.5rem;
            text-align: center;
            opacity: 0.7;
          }

          /* Responsivo */
          @media (max-width: 768px) {
            .cards-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }

            .capture-section {
              margin: 0 20px 3rem;
            }

            .hero h1 {
              padding: 0 20px;
            }
          }
        `}</style>
      </Head>

      <main>
        {/* Header */}
        <header className="header">
          <div className="container">
            <div className="header-content">
              <h1 className="logo">Milena Rocha Nails Design</h1>
              <p className="subtitle">Arte e cuidado com suas unhas em cada detalhe</p>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <h1>Descubra os segredos para <span className="hero-highlight">unhas perfeitas</span> em acrílico, gel e esmaltação que <span className="hero-highlight">duram mais</span></h1>
          </div>
        </section>

        {/* Formulário de Captura */}
        <section className="capture-section">
          <div className="container">
            <div className="capture-content">
              <span className="capture-badge">💅 Acesso Gratuito</span>
              <h2 className="capture-title">Receba o Guia Completo Agora</h2>
              <p className="capture-subtitle">
                Aprenda técnicas profissionais e segredos para unhas perfeitas.<br />
                <strong>100% Gratuito • Acesso Imediato</strong>
              </p>
              
              {!showSuccess && !showGuide && (
                <div className="form-container">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="nome"
                        placeholder="Seu nome completo"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <input
                        type="tel"
                        name="telefone"
                        placeholder="(11) 99999-9999"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <button type="submit" className="submit-btn" disabled={isLoading}>
                      {isLoading ? '⏳ Enviando...' : '💅 Quero o Guia Gratuito'}
                    </button>
                  </form>
                </div>
              )}

              {showSuccess && (
                <div className="success-message">
                  <h3>🎉 Sucesso!</h3>
                  <p>Dados salvos! Carregando seu guia exclusivo...</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Guia Completo - Mostra após formulário */}
        {showGuide && (
          <section className="guide-section">
            <div className="container">
              <h2 className="section-title">🎁 Seu Guia Completo de Unhas</h2>
              <p className="section-subtitle">Parabéns! Aqui estão todas as técnicas profissionais</p>
              
              <div className="cards-grid">
                {/* Card 1: Unhas em Acrílico */}
                <div className="card">
                  <span className="card-icon">💅</span>
                  <h3>Unhas em Acrílico</h3>
                  <div className="card-content">
                    <p><strong>🏆 Vantagens do Acrílico:</strong></p>
                    <ul>
                      <li>Resistência superior - ideal para quem trabalha muito com as mãos</li>
                      <li>Durabilidade de 3-4 semanas sem descascar</li>
                      <li>Perfeito para alongamentos e formatos estruturados</li>
                      <li>Base ideal para nail arts elaboradas e 3D</li>
                      <li>Secagem rápida ao ar livre</li>
                    </ul>
                    
                    <p><strong>🔧 Cuidados Essenciais:</strong></p>
                    <ul>
                      <li>Use sempre luvas para limpeza pesada e jardinagem</li>
                      <li>Hidrate cutículas diariamente com óleo específico</li>
                      <li>NUNCA use as unhas como ferramentas (abrir latas, etc.)</li>
                      <li>Faça manutenção a cada 15-20 dias</li>
                      <li>Remova apenas com profissional para evitar danos</li>
                    </ul>

                    <p><strong>💡 Dica Profissional:</strong></p>
                    <p>Aplique uma gotinha de óleo de cutícula na lateral das unhas antes de dormir. Isso mantém a flexibilidade e evita rachaduras.</p>
                  </div>
                </div>

                {/* Todos os outros cards continuam com o mesmo conteúdo... */}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>Milena Rocha Nails Design</h3>
                <p>Especialista em nail design com técnicas exclusivas e produtos de alta qualidade. Transformando unhas em verdadeiras obras de arte.</p>
                
                <div className="social-links">
                  <a href="https://www.instagram.com/milenarocha.nailsdesigner/" target="_blank" rel="noopener noreferrer">
                    📷 @milenarocha.nailsdesigner
                  </a>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>&copy; 2025 Milena Rocha Nails Design. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}