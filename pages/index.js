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

    // Máscara para telefone
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

                {/* Card 2: Alongamento em Gel */}
                <div className="card">
                  <span className="card-icon">💎</span>
                  <h3>Alongamento em Gel</h3>
                  <div className="card-content">
                    <p><strong>✨ Quando Escolher Gel:</strong></p>
                    <ul>
                      <li>Visual mais natural e movimento flexível</li>
                      <li>Menos agressivo à unha natural</li>
                      <li>Secagem instantânea com cabine LED/UV</li>
                      <li>Ideal para unhas sensíveis ou danificadas</li>
                      <li>Acabamento brilhante duradouro</li>
                    </ul>
                    
                    <p><strong>🛠️ Manutenção Correta:</strong></p>
                    <ul>
                      <li>Retoque profissional a cada 2-3 semanas</li>
                      <li>Use base fortalecedora entre aplicações</li>
                      <li>Evite produtos com acetona pura</li>
                      <li>Proteja do ressecamento com cremes específicos</li>
                      <li>Remoção sempre profissional com lixamento suave</li>
                    </ul>

                    <p><strong>⚠️ Cuidado Especial:</strong></p>
                    <p>Se notar descolamento nas bordas, procure um profissional imediatamente. Não puxe ou force a remoção!</p>
                  </div>
                </div>

                {/* Card 3: Esmaltação Profissional */}
                <div className="card">
                  <span className="card-icon">🌟</span>
                  <h3>Esmaltação Profissional</h3>
                  <div className="card-content">
                    <p><strong>🎯 Preparação Perfeita:</strong></p>
                    <ul>
                      <li>Retire completamente esmalte anterior com algodão</li>
                      <li>Empurre cutículas com espátula após amolecimento</li>
                      <li>Lima no formato desejado com movimentos unidirecionais</li>
                      <li>Desengordue com álcool 70% ou primer</li>
                      <li>Aplique base específica para seu tipo de unha</li>
                    </ul>
                    
                    <p><strong>🎨 Técnica de Aplicação:</strong></p>
                    <ul>
                      <li>Camadas finas e uniformes (3 pinceladas máximo)</li>
                      <li>Comece pelo meio, depois laterais</li>
                      <li>Deixe secar completamente entre camadas (2-3 min)</li>
                      <li>2 camadas de cor + base + top coat</li>
                      <li>Finalize com óleo de cutícula</li>
                    </ul>

                    <p><strong>🔒 Segredos para Durar 7+ Dias:</strong></p>
                    <ul>
                      <li>Evite água muito quente nas primeiras 4 horas</li>
                      <li>Use luvas para lavar louça e produtos químicos</li>
                      <li>Reaplique top coat a cada 2-3 dias</li>
                      <li>Hidrate cutículas diariamente</li>
                      <li>Faça movimentos suaves ao abrir coisas</li>
                    </ul>
                  </div>
                </div>

                {/* Card 4: Troubleshooting */}
                <div className="card">
                  <span className="card-icon">🔧</span>
                  <h3>Soluções para Problemas</h3>
                  <div className="card-content">
                    <p><strong>🚨 Problemas Comuns & Soluções:</strong></p>
                    
                    <p><strong>Esmalte descascando rápido:</strong></p>
                    <ul>
                      <li>✅ Use sempre base + 2 camadas + top coat</li>
                      <li>✅ Desengordue bem antes da aplicação</li>
                      <li>✅ Evite cremes nas mãos antes de esmaltar</li>
                    </ul>

                    <p><strong>Bolhas no esmalte:</strong></p>
                    <ul>
                      <li>✅ Aplique camadas mais finas</li>
                      <li>✅ Deixe secar mais tempo entre camadas</li>
                      <li>✅ Evite balançar o frasco (gira entre as palmas)</li>
                    </ul>

                    <p><strong>Cutículas ressecadas:</strong></p>
                    <ul>
                      <li>✅ Óleo de cutícula 2x ao dia</li>
                      <li>✅ Hidratante específico para mãos</li>
                      <li>✅ Evite retirar cutículas secas</li>
                    </ul>

                    <p><strong>Unha quebradiça:</strong></p>
                    <ul>
                      <li>✅ Base fortalecedora 3x por semana</li>
                      <li>✅ Suplemento de biotina</li>
                      <li>✅ Evite lixas muito grossas</li>
                    </ul>
                  </div>
                </div>

                {/* Card 5: Kit Essencial */}
                <div className="card">
                  <span className="card-icon">🎁</span>
                  <h3>Kit Essencial para Casa</h3>
                  <div className="card-content">
                    <p><strong>🧰 Ferramentas Básicas:</strong></p>
                    <ul>
                      <li>Lima de vidro ou metal (180/240)</li>
                      <li>Lixa polidor (buffer)</li>
                      <li>Espátula para cutícula</li>
                      <li>Alicate pequeno e afiado</li>
                      <li>Separador de dedos</li>
                    </ul>
                    
                    <p><strong>💄 Produtos Indispensáveis:</strong></p>
                    <ul>
                      <li>Base fortalecedora de qualidade</li>
                      <li>Top coat secagem rápida</li>
                      <li>Óleo de cutícula (amêndoa ou jojoba)</li>
                      <li>Removedor sem acetona</li>
                      <li>Algodão e hastes flexíveis</li>
                    </ul>

                    <p><strong>🌈 Cores Versáteis:</strong></p>
                    <ul>
                      <li>Nude rosado (combina com tudo)</li>
                      <li>Vermelho clássico</li>
                      <li>Branco (para francesinha)</li>
                      <li>Preto (elegante)</li>
                      <li>Uma cor tendência da estação</li>
                    </ul>
                  </div>
                </div>

                {/* Card 6: Cuidados Especiais */}
                <div className="card">
                  <span className="card-icon">🌿</span>
                  <h3>Cuidados & Tratamentos</h3>
                  <div className="card-content">
                    <p><strong>💆‍♀️ Rotina de Cuidados:</strong></p>
                    <ul>
                      <li><strong>Manhã:</strong> Hidratante com FPS nas mãos</li>
                      <li><strong>Tarde:</strong> Óleo nas cutículas se estiver seco</li>
                      <li><strong>Noite:</strong> Creme nutritivo + massagem</li>
                      <li><strong>Semanal:</strong> Esfoliação suave nas mãos</li>
                    </ul>
                    
                    <p><strong>🏠 Receitas Caseiras:</strong></p>
                    <ul>
                      <li><strong>Fortalecedor:</strong> Azeite + limão (1x semana)</li>
                      <li><strong>Hidratação:</strong> Mel + aveia para as mãos</li>
                      <li><strong>Clareamento:</strong> Bicarbonato + água oxigenada</li>
                      <li><strong>Crescimento:</strong> Massagem com óleo de ricínio</li>
                    </ul>

                    <p><strong>⚠️ Quando Procurar Profissional:</strong></p>
                    <ul>
                      <li>Infecções ou inflamações</li>
                      <li>Unhas encravadas</li>
                      <li>Mudanças na cor ou textura</li>
                      <li>Dor persistente</li>
                      <li>Procedimentos de alongamento</li>
                    </ul>
                  </div>
                </div>
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