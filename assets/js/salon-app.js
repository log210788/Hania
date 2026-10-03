/**
 * 🌸 Hania's English Afternoon Tea Salon Interactive Logic
 * Core games, 3-second sprint timer, preference sorter, and voice booth
 */

(function () {
  'use strict';

  // 10 Concept triggers dataset
  const triggersData = [
    {
      id: 1,
      word: "Complacency",
      ipa: "/kəmˈpleɪsənsi/",
      schwaIndex: [1],
      meaning: "Dangerous uncritical satisfaction when unaware of impending risks.",
      collocations: ["breed complacency", "corporate complacency", "slide into complacency"],
      teaExample: "Resting on past successes breeds complacency in boutique tea craftsmanship.",
      formula1: "It essentially refers to a state or situation where people become so comfortable that they ignore impending warning signs.",
      formula2: "It's practically the polar opposite of vigilance—instead of staying proactive, people relax and assume nothing can go wrong.",
      formula3: "Picture a company that dominates the market for decades and stops innovating until a competitor suddenly overtakes them—that's complacency."
    },
    {
      id: 2,
      word: "Orchestrated",
      ipa: "/ˈɔːkɪstreɪtɪd/",
      meaning: "Carefully coordinated in advance behind closed doors to appear spontaneous.",
      collocations: ["orchestrated campaign", "orchestrated leak", "highly orchestrated"],
      teaExample: "The royal tea salon launch was meticulously orchestrated from top to bottom.",
      formula1: "It essentially refers to an event or campaign that has been pre-planned in secrecy to create an illusion of natural spontaneity.",
      formula2: "It's practically the polar opposite of an organic happening—rather than arising by chance, every detail has been staged.",
      formula3: "Picture a politician's 'impromptu' tea walkabout where every photographer and supporter was positioned hours in advance—that is orchestrated."
    },
    {
      id: 3,
      word: "A Gathering",
      ipa: "/ə ˈɡæðərɪŋ/",
      meaning: "An assembly of people in one place (from intimate salons to grand rallies).",
      collocations: ["intimate gathering", "family gathering", "social gathering"],
      teaExample: "We hosted an intimate afternoon tea gathering under the wisteria arbor.",
      formula1: "It essentially refers to any occasion where a group of individuals congregate together in a shared space.",
      formula2: "It's distinct from solitude or isolation—it brings people into physical proximity for discussion or celebration.",
      formula3: "Picture friends arriving with cakes, teapots brewing, and everyone sitting around a parlor table—that's a gathering."
    },
    {
      id: 4,
      word: "Spontaneous",
      ipa: "/spɒnˈteɪniəs/",
      meaning: "Unplanned, unscripted, and arising from natural impulse.",
      collocations: ["spontaneous decision", "spontaneous applause", "lack of spontaneity"],
      teaExample: "We booked a spontaneous weekend train ride to the English countryside.",
      formula1: "It essentially refers to an action or reaction that occurs purely on impulse without any prior deliberation.",
      formula2: "It's practically the polar opposite of calculated or scripted—it happens in the spur of the moment.",
      formula3: "Picture waking up on a sunny Saturday and suddenly deciding to take the morning ferry to France—that's spontaneous."
    },
    {
      id: 5,
      word: "Ferocious",
      ipa: "/fəˈrəʊʃəs/",
      meaning: "Savagely intense, fiercely competitive, or wildly powerful.",
      collocations: ["ferocious debate", "ferocious competitor", "unrelenting ferocity"],
      teaExample: "The competition for the best afternoon tea in Mayfair is absolutely ferocious.",
      formula1: "It essentially refers to a level of aggression, passion, or intensity that feels almost predatory or unyielding.",
      formula2: "It's practically the polar opposite of mild or subdued—it carries immense raw power.",
      formula3: "Picture two lawyers arguing in court with uncompromising verbal attacks—that's a ferocious exchange."
    },
    {
      id: 6,
      word: "A Common Occurrence",
      ipa: "/ə ˈkɒmən əˈkʌrəns/",
      meaning: "A standard, habitual event that happens frequently rather than a rare surprise.",
      collocations: ["everyday occurrence", "frequent occurrence", "not an uncommon occurrence"],
      teaExample: "Afternoon rain showers in London are an unfortunately common occurrence.",
      formula1: "It essentially refers to an incident or phenomenon that takes place so regularly that nobody is surprised by it.",
      formula2: "It's the polar opposite of an anomaly or once-in-a-lifetime miracle—it is standard routine.",
      formula3: "Picture trains in winter experiencing slight delays due to leaves on the tracks—that is a common occurrence in Britain."
    },
    {
      id: 7,
      word: "Awoken to a Problem",
      ipa: "/əˈwəʊkən.../",
      meaning: "Suddenly realizing a critical truth or danger that was previously ignored.",
      collocations: ["a rude awakening", "a wake-up call", "awaken to the reality"],
      teaExample: "The sudden frost was a rude awakening for the tea estate gardeners.",
      formula1: "It essentially refers to the exact psychological moment when an illusion vanishes and reality hits you.",
      formula2: "It's practically the polar opposite of being in denial—it's when you can no longer turn a blind eye.",
      formula3: "Picture checking your phone balance after a lavish shopping spree in Knightsbridge and seeing zero—that's being awoken to a problem."
    },
    {
      id: 8,
      word: "A Sleepover vs. Summit",
      ipa: "/ˈsliːpəʊvə/ vs /ˈsʌmɪt/",
      meaning: "Contrasting a cozy, informal stay with a high-stakes executive conference.",
      collocations: ["casual sleepover", "weekend retreat", "strategic summit"],
      teaExample: "This strategy meeting shouldn't feel like a casual sleepover; it is an executive summit.",
      formula1: "It contrasts an informal, pajama-friendly social visit with a formal meeting where vital decisions are signed.",
      formula2: "A sleepover is relaxed and leisurely, whereas a summit is structured, strategic, and outcome-driven.",
      formula3: "Picture children in sleeping bags watching films versus prime ministers negotiating trade treaties—that's the contrast."
    },
    {
      id: 9,
      word: "Polarization",
      ipa: "/ˌpəʊləraɪˈzeɪʃən/",
      meaning: "Division into two sharply contrasting, hostile factions that refuse dialogue.",
      collocations: ["deeply polarized", "at loggerheads", "strained relations"],
      teaExample: "Online tea debates over milk-first versus tea-first can spark fierce polarization!",
      formula1: "It essentially refers to a socio-political state where the middle ground completely disappears into two warring extremes.",
      formula2: "It's practically the polar opposite of consensus or harmony—it is mutual division.",
      formula3: "Picture a dinner party where half the guests support one ideology and half support the other, and nobody will pass the scones—that's polarization."
    },
    {
      id: 10,
      word: "Pushback / Backlash",
      ipa: "/ˈpʊʃbæk/ / /ˈbæklæʃ/",
      meaning: "Resistance or hostile reaction from consumers, employees, or citizens.",
      collocations: ["face fierce pushback", "spark a public backlash", "encounter resistance"],
      teaExample: "The bakery faced unexpected pushback after trying to replace classic Earl Grey with synthetic syrups.",
      formula1: "It essentially refers to the collective resistance or protest that erupts when an unpopular change is enforced.",
      formula2: "It's practically the polar opposite of widespread acceptance or compliant applause.",
      formula3: "Picture an airline announcing it will charge for carry-on handbags, resulting in thousands of angry tweets in one hour—that's a backlash."
    }
  ];

  /* ==========================================================================
     1. Anti-Translation Sprint Timer Engine
     ========================================================================== */
  let sprintInterval = null;
  let sprintStage = 'idle'; // 'idle', 'countdown', 'speaking'
  let currentSprintTrigger = null;

  window.initSprintModule = function () {
    const triggerWordEl = document.getElementById('sprintTriggerWord');
    const triggerIpaEl = document.getElementById('sprintTriggerIpa');
    const triggerMeaningEl = document.getElementById('sprintTriggerMeaning');
    const timerDisplayEl = document.getElementById('sprintTimerDisplay');
    const timerStatusEl = document.getElementById('sprintTimerStatus');
    const timerCircleEl = document.getElementById('sprintTimerCircle');
    const startBtn = document.getElementById('sprintStartBtn');
    const nextBtn = document.getElementById('sprintNextBtn');
    const audioBtn = document.getElementById('sprintAudioBtn');

    if (!startBtn) return;

    function selectTrigger(id) {
      if (id !== undefined) {
        currentSprintTrigger = triggersData.find(t => t.id === id) || triggersData[0];
      } else {
        const randomIndex = Math.floor(Math.random() * triggersData.length);
        currentSprintTrigger = triggersData[randomIndex];
      }

      triggerWordEl.textContent = currentSprintTrigger.word;
      triggerIpaEl.textContent = currentSprintTrigger.ipa;
      triggerMeaningEl.textContent = currentSprintTrigger.meaning;

      // Update 3-angle formulas display
      document.getElementById('formula1Text').textContent = currentSprintTrigger.formula1;
      document.getElementById('formula2Text').textContent = currentSprintTrigger.formula2;
      document.getElementById('formula3Text').textContent = currentSprintTrigger.formula3;
    }

    selectTrigger(1);

    audioBtn.addEventListener('click', () => {
      window.TeaAudio.playCupClink();
      window.TeaAudio.speakBritish(currentSprintTrigger.word);
    });

    nextBtn.addEventListener('click', () => {
      resetSprint();
      selectTrigger();
    });

    startBtn.addEventListener('click', () => {
      if (sprintStage !== 'idle') {
        resetSprint();
        return;
      }
      startSprintFlow();
    });

    function startSprintFlow() {
      sprintStage = 'countdown';
      startBtn.textContent = '⏹ Stop Sprint';
      startBtn.classList.replace('bg-pink-600', 'bg-rose-800');
      timerStatusEl.textContent = '⏱️ Prepare! Speaking in:';

      let prepTime = 3;
      timerDisplayEl.textContent = prepTime + 's';
      window.TeaAudio.playCupClink();

      sprintInterval = setInterval(() => {
        prepTime--;
        if (prepTime > 0) {
          timerDisplayEl.textContent = prepTime + 's';
          window.TeaAudio.playCupClink();
        } else {
          clearInterval(sprintInterval);
          startSpeakingPhase();
        }
      }, 1000);
    }

    function startSpeakingPhase() {
      sprintStage = 'speaking';
      window.TeaAudio.playTeaBell();
      timerStatusEl.textContent = '🗣️ SPEAK NOW! (25 seconds continuous English):';

      let speakTime = 25;
      timerDisplayEl.textContent = speakTime + 's';
      timerDisplayEl.classList.add('text-pink-600', 'animate-pulse');

      sprintInterval = setInterval(() => {
        speakTime--;
        timerDisplayEl.textContent = speakTime + 's';

        if (speakTime <= 0) {
          clearInterval(sprintInterval);
          finishSprint();
        }
      }, 1000);
    }

    function finishSprint() {
      sprintStage = 'idle';
      window.TeaAudio.playHarpChime();
      timerDisplayEl.classList.remove('text-pink-600', 'animate-pulse');
      timerStatusEl.textContent = '🎉 Splendid work, Hania! Cup of tea well-deserved!';
      timerDisplayEl.textContent = 'Done!';
      startBtn.textContent = '✨ Start Another Sprint';
      startBtn.classList.replace('bg-rose-800', 'bg-pink-600');
    }

    function resetSprint() {
      if (sprintInterval) clearInterval(sprintInterval);
      sprintStage = 'idle';
      timerDisplayEl.classList.remove('text-pink-600', 'animate-pulse');
      timerStatusEl.textContent = 'Ready for the 3-Second Challenge?';
      timerDisplayEl.textContent = '3s';
      startBtn.textContent = '🌸 Begin 3-Second Sprint';
      startBtn.classList.remove('bg-rose-800');
      startBtn.classList.add('bg-pink-600');
    }
  };

  /* ==========================================================================
     2. Nuanced British Preference Quiz Module
     ========================================================================== */
  const preferenceQuestions = [
    {
      phrase: "It's right up my street, actually.",
      tier: "enthusiastic",
      explanation: "Means it perfectly suits your tastes or interests! Highly enthusiastic."
    },
    {
      phrase: "It's not half bad, to be fair.",
      tier: "warm",
      explanation: "Classic British modesty: saying something isn't half bad means it is very good!"
    },
    {
      phrase: "It's not quite my cup of tea.",
      tier: "diplomatic",
      explanation: "Quintessential British polite distance: a delicate way to decline or express distaste."
    },
    {
      phrase: "I'm a massive fan of it, quite frankly.",
      tier: "enthusiastic",
      explanation: "Expresses direct, joyful endorsement without reservations."
    },
    {
      phrase: "It certainly ticks all the right boxes.",
      tier: "warm",
      explanation: "Understated approval confirming it satisfies all requirements."
    },
    {
      phrase: "I wouldn't say no to that!",
      tier: "warm",
      explanation: "A warm and polite British acceptance, especially for treats or helpful gestures."
    },
    {
      phrase: "I can take it or leave it, to be fair.",
      tier: "diplomatic",
      explanation: "Indicates complete neutrality or mild indifference."
    },
    {
      phrase: "It leaves a little to be desired.",
      tier: "diplomatic",
      explanation: "Gentle British critique signifying that it fell short of expectations."
    },
    {
      phrase: "It's a bit much for my liking.",
      tier: "diplomatic",
      explanation: "Politely signals that something is excessive, loud, or overwhelming."
    },
    {
      phrase: "I'm quite partial to it, actually.",
      tier: "warm",
      explanation: "Indicates a gentle, fond liking for something."
    }
  ];

  window.initPreferenceQuiz = function () {
    let currentIndex = 0;
    let score = 0;

    const phraseEl = document.getElementById('quizPhraseText');
    const feedbackEl = document.getElementById('quizFeedback');
    const buttons = document.querySelectorAll('.quiz-tier-btn');
    const nextBtn = document.getElementById('quizNextBtn');
    const scoreEl = document.getElementById('quizScore');

    if (!phraseEl) return;

    function renderQuestion() {
      const q = preferenceQuestions[currentIndex];
      phraseEl.textContent = `"${q.phrase}"`;
      feedbackEl.classList.add('hidden');
      feedbackEl.textContent = '';
      nextBtn.classList.add('hidden');
      buttons.forEach(btn => btn.disabled = false);
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedTier = e.currentTarget.getAttribute('data-tier');
        const q = preferenceQuestions[currentIndex];
        buttons.forEach(b => b.disabled = true);

        if (selectedTier === q.tier) {
          score++;
          scoreEl.textContent = score;
          window.TeaAudio.playCupClink();
          feedbackEl.innerHTML = `✨ <strong class="text-pink-700">Spot on, Hania!</strong> ${q.explanation}`;
          feedbackEl.className = "mt-3 p-3 rounded-xl bg-pink-100/90 text-pink-900 border border-pink-300 text-xs block";
        } else {
          feedbackEl.innerHTML = `☕ <strong class="text-amber-800">Close!</strong> That actually belongs in the <em>${q.tier}</em> tier. ${q.explanation}`;
          feedbackEl.className = "mt-3 p-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 text-xs block";
        }

        nextBtn.classList.remove('hidden');
      });
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % preferenceQuestions.length;
      renderQuestion();
    });

    renderQuestion();
  };

  /* ==========================================================================
     3. 16-Card Porcelain Tea Tin Memory Match Game
     ========================================================================== */
  const memoryDeckData = [
    { id: 1, pairId: 'complacency', type: 'word', text: 'Complacency', sub: 'Concept' },
    { id: 2, pairId: 'complacency', type: 'def', text: 'Sliding into uncritical comfort while ignoring risks', sub: 'Meaning' },
    { id: 3, pairId: 'cupoftea', type: 'word', text: 'Not my cup of tea', sub: 'British Nuance' },
    { id: 4, pairId: 'cupoftea', type: 'def', text: 'Polite diplomatic reservation: it does not suit my personal taste', sub: 'Meaning' },
    { id: 5, pairId: 'spontaneous', type: 'word', text: 'Spontaneous', sub: 'Concept' },
    { id: 6, pairId: 'spontaneous', type: 'def', text: 'Unscripted, natural impulse without premeditated planning', sub: 'Meaning' },
    { id: 7, pairId: 'upmystreet', type: 'word', text: 'Right up my street', sub: 'British Nuance' },
    { id: 8, pairId: 'upmystreet', type: 'def', text: 'Enthusiastic endorsement: fits my personal aesthetic completely', sub: 'Meaning' },
    { id: 9, pairId: 'catenation', type: 'word', text: 'Hold ‿ on ‿ a second', sub: 'Catenation Flow' },
    { id: 10, pairId: 'catenation', type: 'def', text: 'Connecting final consonants into following vowels seamlessly', sub: 'Meaning' },
    { id: 11, pairId: 'schwa', type: 'word', text: 'The Schwa (/ə/)', sub: 'Pronunciation' },
    { id: 12, pairId: 'schwa', type: 'def', text: 'Neutral, squashed vowel in unstressed British syllables', sub: 'Meaning' },
    { id: 13, pairId: 'tobefair', type: 'word', text: 'To be fair', sub: 'Discourse Marker' },
    { id: 14, pairId: 'tobefair', type: 'def', text: 'Introducing a balanced concession or counterpoint politely', sub: 'Meaning' },
    { id: 15, pairId: 'nothalfbad', type: 'word', text: 'Not half bad', sub: 'British Nuance' },
    { id: 16, pairId: 'nothalfbad', type: 'def', text: 'Understated British praise meaning surprisingly delightful', sub: 'Meaning' }
  ];

  window.initMemoryBoard = function () {
    const grid = document.getElementById('memoryCardsGrid');
    const matchedCountEl = document.getElementById('matchedPairsCount');
    const resetBtn = document.getElementById('memoryResetBtn');

    if (!grid) return;

    let flippedCards = [];
    let matchedPairs = 0;
    let lockBoard = false;

    // Shuffle deck while keeping numbering clean 1-16
    function setupGame() {
      grid.innerHTML = '';
      flippedCards = [];
      matchedPairs = 0;
      lockBoard = false;
      matchedCountEl.textContent = '0';

      const shuffled = [...memoryDeckData].sort(() => Math.random() - 0.5);

      shuffled.forEach((item, index) => {
        const cardNum = index + 1;
        const cardEl = document.createElement('div');
        cardEl.className = 'perspective-1000 h-28 cursor-pointer select-none';
        cardEl.setAttribute('data-id', item.id);
        cardEl.setAttribute('data-pair', item.pairId);

        cardEl.innerHTML = `
          <div class="card-flip-inner relative w-full h-full transform-style-3d duration-500 rounded-2xl shadow-sm">
            <!-- Front: Porcelain Tea Tin with Number -->
            <div class="absolute inset-0 backface-hidden bg-gradient-to-br from-rose-50 to-pink-100/90 border-2 border-pink-200/90 rounded-2xl p-2 flex flex-col items-center justify-between text-center shadow hover:shadow-md hover:border-pink-300 transition-all">
              <span class="text-[10px] uppercase font-bold tracking-wider text-pink-600/70 font-serif-luxury">Tea Tin #${cardNum}</span>
              <div class="w-10 h-10 rounded-full bg-white border border-pink-200 shadow-inner flex items-center justify-center text-lg font-bold text-pink-600 font-serif-luxury">
                ${cardNum}
              </div>
              <span class="text-[10px] text-pink-500 font-medium">🌸 Tap to Flip</span>
            </div>
            <!-- Back: Target content -->
            <div class="absolute inset-0 backface-hidden rotate-y-180 bg-white border-2 border-pink-400 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-md">
              <span class="text-[9px] uppercase tracking-wider font-bold text-pink-600 mb-1">${item.sub}</span>
              <p class="text-xs font-bold text-slate-800 leading-snug">${item.text}</p>
            </div>
          </div>
        `;

        cardEl.addEventListener('click', () => handleCardClick(cardEl, item));
        grid.appendChild(cardEl);
      });
    }

    function handleCardClick(cardEl, item) {
      if (lockBoard) return;
      if (cardEl.classList.contains('is-flipped') || cardEl.classList.contains('is-matched')) return;

      window.TeaAudio.playCupClink();
      const inner = cardEl.querySelector('.card-flip-inner');
      inner.classList.add('rotate-y-180');
      cardEl.classList.add('is-flipped');

      flippedCards.push({ cardEl, item, inner });

      if (flippedCards.length === 2) {
        checkMatch();
      }
    }

    function checkMatch() {
      lockBoard = true;
      const [card1, card2] = flippedCards;

      if (card1.item.pairId === card2.item.pairId) {
        // Matched!
        setTimeout(() => {
          window.TeaAudio.playHarpChime();
          card1.cardEl.classList.add('is-matched', 'card-matched');
          card2.cardEl.classList.add('is-matched', 'card-matched');
          matchedPairs++;
          matchedCountEl.textContent = matchedPairs;
          flippedCards = [];
          lockBoard = false;

          if (matchedPairs === 8) {
            window.TeaAudio.playTeaBell();
            alert('🎉 Magnifique, Hania! All 8 English Tea Pairs Matched perfectly!');
          }
        }, 400);
      } else {
        // Mismatch
        setTimeout(() => {
          card1.cardEl.classList.add('card-mismatch');
          card2.cardEl.classList.add('card-mismatch');
        }, 400);

        setTimeout(() => {
          card1.inner.classList.remove('rotate-y-180');
          card2.inner.classList.remove('rotate-y-180');
          card1.cardEl.classList.remove('is-flipped', 'card-mismatch');
          card2.cardEl.classList.remove('is-flipped', 'card-mismatch');
          flippedCards = [];
          lockBoard = false;
        }, 1100);
      }
    }

    resetBtn.addEventListener('click', () => {
      window.TeaAudio.playCupClink();
      setupGame();
    });

    setupGame();
  };

  /* ==========================================================================
     4. Voice Recording Booth with Waveform Visualizer
     ========================================================================== */
  window.initVoiceBooth = function () {
    const recordBtn = document.getElementById('recordAudioBtn');
    const statusEl = document.getElementById('recordStatus');
    const audioPreview = document.getElementById('recordedAudioPlayback');
    const canvas = document.getElementById('recordWaveformCanvas');

    if (!recordBtn || !canvas) return;

    let mediaRecorder = null;
    let audioChunks = [];
    let audioContext = null;
    let analyser = null;
    let visualizerAnimation = null;

    recordBtn.addEventListener('click', async () => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        // Stop recording
        mediaRecorder.stop();
        recordBtn.textContent = '🎙️ Record Another Note';
        recordBtn.classList.replace('bg-rose-700', 'bg-pink-600');
        statusEl.textContent = '✅ Recording saved! Listen below:';
        if (visualizerAnimation) cancelAnimationFrame(visualizerAnimation);
      } else {
        // Start recording
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          audioChunks = [];
          mediaRecorder = new MediaRecorder(stream);

          // Audio visualizer setup
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioContext = new AudioContext();
          const source = audioContext.createMediaStreamSource(stream);
          analyser = audioContext.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);

          drawWaveform(canvas, analyser);

          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) audioChunks.push(e.data);
          };

          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPreview.src = audioUrl;
            audioPreview.classList.remove('hidden');
            stream.getTracks().forEach(track => track.stop());
          };

          mediaRecorder.start();
          window.TeaAudio.playCupClink();
          recordBtn.textContent = '⏹ Stop Recording';
          recordBtn.classList.replace('bg-pink-600', 'bg-rose-700');
          statusEl.textContent = '🔴 Recording live... Speak your British English note!';
        } catch (err) {
          console.error(err);
          statusEl.textContent = '⚠️ Microphone permission is required to record.';
        }
      }
    });

    function drawWaveform(canvas, analyser) {
      const ctx = canvas.getContext('2d');
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function render() {
        visualizerAnimation = requestAnimationFrame(render);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / bufferLength) * 2;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height * 0.85;
          ctx.fillStyle = `rgb(244, 114, 182)`;
          ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
          x += barWidth;
        }
      }
      render();
    }
  };

  // Populate interactive concept trigger tables and speech links
  window.initTriggersTable = function () {
    const listContainer = document.getElementById('conceptTriggersAccordion');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    triggersData.forEach((item) => {
      const card = document.createElement('div');
      card.className = "porcelain-card p-4 hover:border-pink-300 transition-all";
      card.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-pink-100 border border-pink-300 flex items-center justify-center font-bold text-pink-600 text-xs font-serif-luxury">
              ${item.id < 10 ? '0' + item.id : item.id}
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-slate-800 text-base font-serif-luxury tracking-wide">${item.word}</h4>
                <span class="text-xs text-pink-600 font-mono font-medium">${item.ipa}</span>
              </div>
              <p class="text-xs text-slate-600 mt-0.5">${item.meaning}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="speak-btn px-2.5 py-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-semibold flex items-center gap-1.5 transition shadow-sm" data-text="${item.word}">
              <span>🔊</span> Pronounce
            </button>
            <button class="expand-formula-btn px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-medium flex items-center gap-1 transition">
              <span>📐</span> 3 Angles
            </button>
          </div>
        </div>

        <!-- Hidden 3 Angles Drawer -->
        <div class="formula-drawer hidden mt-4 pt-3 border-t border-pink-100 text-xs space-y-2.5">
          <div class="p-2.5 rounded-xl bg-pink-50/60 border border-pink-200/70">
            <span class="font-bold text-pink-800 uppercase text-[10px] tracking-wider block mb-0.5">Formula 1 (Functional):</span>
            <p class="text-slate-700 italic">${item.formula1}</p>
          </div>
          <div class="p-2.5 rounded-xl bg-rose-50/60 border border-rose-200/70">
            <span class="font-bold text-rose-800 uppercase text-[10px] tracking-wider block mb-0.5">Formula 2 (Contrast):</span>
            <p class="text-slate-700 italic">${item.formula2}</p>
          </div>
          <div class="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/70">
            <span class="font-bold text-amber-800 uppercase text-[10px] tracking-wider block mb-0.5">Formula 3 (Vignette):</span>
            <p class="text-slate-700 italic">${item.formula3}</p>
          </div>
        </div>
      `;

      // Event listeners
      card.querySelector('.speak-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        window.TeaAudio.playCupClink();
        window.TeaAudio.speakBritish(item.word);
      });

      const drawer = card.querySelector('.formula-drawer');
      const expandBtn = card.querySelector('.expand-formula-btn');
      expandBtn.addEventListener('click', () => {
        drawer.classList.toggle('hidden');
        expandBtn.classList.toggle('bg-rose-200');
      });

      listContainer.appendChild(card);
    });
  };

  // Initialize all interactive modules on load
  document.addEventListener('DOMContentLoaded', () => {
    if (window.initSprintModule) window.initSprintModule();
    if (window.initPreferenceQuiz) window.initPreferenceQuiz();
    if (window.initMemoryBoard) window.initMemoryBoard();
    if (window.initVoiceBooth) window.initVoiceBooth();
    if (window.initTriggersTable) window.initTriggersTable();

    // Global audio delegation for buttons with data-speak attribute
    document.body.addEventListener('click', (e) => {
      const speakTarget = e.target.closest('[data-speak]');
      if (speakTarget) {
        const text = speakTarget.getAttribute('data-speak');
        window.TeaAudio.playCupClink();
        window.TeaAudio.speakBritish(text);
      }
    });
  });
})();
