'use client';

export default function Page() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Baseline</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #0a0e27;
            color: #e0e0e0;
            overflow: hidden;
        }

        html, body, #app {
            width: 100%;
            height: 100%;
        }

        #app {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        /* MAIN SCREEN */
        .main-screen {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 3rem 2rem;
            animation: fadeIn 0.3s ease-in;
            position: relative;
        }

        canvas#ambientCanvas {
            position: absolute;
            inset: 0;
            opacity: 0.15;
            pointer-events: none;
        }

        .status-area {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
            position: relative;
            z-index: 10;
        }

        .status-indicator {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.95rem;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-weight: 500;
        }

        .status-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #666;
            transition: all 0.3s ease;
            box-shadow: 0 0 8px rgba(102, 102, 102, 0.3);
        }

        .status-dot.connected.ready {
            background: #4ade80;
            box-shadow: 0 0 16px rgba(74, 222, 128, 0.6);
        }

        .status-dot.connected.not-ready {
            background: #fbbf24;
            box-shadow: 0 0 16px rgba(251, 191, 36, 0.6);
        }

        .status-dot.disconnected {
            background: #ef4444;
            box-shadow: 0 0 16px rgba(239, 68, 68, 0.6);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .status-text {
            text-align: center;
            font-size: 0.85rem;
            opacity: 0.7;
        }

        .center-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            width: 100%;
            position: relative;
            z-index: 10;
        }

        .coffee-button {
            padding: 1.2rem 2.5rem;
            font-size: 1.1rem;
            font-weight: 500;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
            color: white;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
            position: relative;
            overflow: hidden;
        }

        .coffee-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 12px 32px rgba(59, 130, 246, 0.5);
        }

        .coffee-button:active:not(:disabled) {
            transform: translateY(0);
        }

        .coffee-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* CAROUSEL */
        .carousel-overlay {
            position: fixed;
            inset: 0;
            background: rgba(10, 14, 39, 0.95);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100;
            animation: fadeIn 0.3s ease-in;
        }

        canvas#carouselCanvas {
            position: absolute;
            inset: 0;
            opacity: 0.1;
            pointer-events: none;
        }

        .carousel-container {
            background: #111827;
            border: 1px solid #1f2937;
            border-radius: 1rem;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
            position: relative;
            z-index: 10;
        }

        .carousel-progress {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 2rem;
            justify-content: center;
        }

        .progress-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #374151;
            transition: all 0.3s ease;
        }

        .progress-dot.active {
            background: #3b82f6;
            transform: scale(1.3);
        }

        .carousel-step {
            text-align: center;
            min-height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            animation: slideIn 0.3s ease-out;
        }

        .carousel-step h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }

        .carousel-step p {
            font-size: 1rem;
            opacity: 0.8;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }

        .carousel-step input {
            background: #1f2937;
            border: 1px solid #374151;
            color: #e0e0e0;
            padding: 0.75rem 1rem;
            border-radius: 0.375rem;
            margin-bottom: 1rem;
            font-size: 1rem;
            width: 100%;
            transition: border-color 0.2s;
        }

        .carousel-step input:focus {
            outline: none;
            border-color: #3b82f6;
        }

        .carousel-controls {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }

        .carousel-btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.375rem;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s;
            font-weight: 500;
        }

        .carousel-btn.prev {
            background: #374151;
            color: #e0e0e0;
        }

        .carousel-btn.prev:hover:not(:disabled) {
            background: #4b5563;
        }

        .carousel-btn.next {
            background: #3b82f6;
            color: white;
        }

        .carousel-btn.next:hover:not(:disabled) {
            background: #2563eb;
        }

        .carousel-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* BREWING VISUALIZATION */
        .brewing-container {
            position: fixed;
            inset: 0;
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            z-index: 50;
            animation: fadeIn 0.5s ease-in;
        }

        canvas#brewingCanvas {
            display: block;
            max-width: 100%;
            max-height: 100%;
        }

        .brewing-info {
            position: absolute;
            bottom: 3rem;
            display: flex;
            gap: 2rem;
            font-size: 0.95rem;
            text-align: center;
        }

        .brewing-stat {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }

        .brewing-stat-value {
            font-size: 1.8rem;
            font-weight: 600;
            color: #4ade80;
        }

        .brewing-stat-label {
            font-size: 0.8rem;
            opacity: 0.6;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        /* SLEEP SCREEN */
        .sleep-screen {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0a0e27 0%, #0f1520 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 2rem;
            position: relative;
            overflow: hidden;
        }

        canvas#sleepCanvas {
            position: absolute;
            inset: 0;
            opacity: 0.3;
        }

        .sleep-content {
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex: 1;
            gap: 2rem;
        }

        .sleep-clock {
            font-size: 3.5rem;
            font-weight: 300;
            letter-spacing: 0.1em;
            font-variant-numeric: tabular-nums;
        }

        .sleep-status {
            font-size: 1.1rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            opacity: 0.6;
            font-weight: 500;
        }

        .sleep-wake {
            padding: 1rem 2rem;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-size: 0.95rem;
            font-weight: 500;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .sleep-wake:hover {
            background: #2563eb;
            transform: translateY(-2px);
        }

        /* SETTINGS */
        .settings-overlay {
            position: fixed;
            inset: 0;
            background: rgba(10, 14, 39, 0.95);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 200;
            animation: fadeIn 0.3s ease-in;
        }

        .settings-dialog {
            background: #111827;
            border: 1px solid #1f2937;
            border-radius: 1rem;
            padding: 2rem;
            max-width: 450px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
        }

        .settings-title {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            font-weight: 600;
        }

        .setting-group {
            margin-bottom: 1.5rem;
        }

        .setting-label {
            display: block;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            opacity: 0.8;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.03em;
        }

        .setting-input {
            width: 100%;
            background: #1f2937;
            border: 1px solid #374151;
            color: #e0e0e0;
            padding: 0.75rem 1rem;
            border-radius: 0.375rem;
            font-size: 1rem;
            transition: border-color 0.2s;
        }

        .setting-input:focus {
            outline: none;
            border-color: #3b82f6;
        }

        .settings-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: #e0e0e0;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0.6;
            transition: opacity 0.2s;
        }

        .settings-close:hover {
            opacity: 1;
        }

        .settings-buttons {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            justify-content: center;
        }

        .settings-button {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.375rem;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s;
            font-weight: 500;
        }

        .settings-button.save {
            background: #3b82f6;
            color: white;
        }

        .settings-button.save:hover {
            background: #2563eb;
        }

        .settings-button.cancel {
            background: #374151;
            color: #e0e0e0;
        }

        .settings-button.cancel:hover {
            background: #4b5563;
        }

        /* TOOLBAR */
        .toolbar {
            position: absolute;
            bottom: 1.5rem;
            right: 1.5rem;
            display: flex;
            gap: 1rem;
        }

        .toolbar-button {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #1f2937;
            border: 1px solid #374151;
            color: #e0e0e0;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .toolbar-button:hover {
            background: #374151;
            border-color: #4b5563;
        }

        /* POWER BUTTON */
        .power-button {
            position: absolute;
            top: 1.5rem;
            left: 1.5rem;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #1f2937;
            border: 2px solid #ef4444;
            color: #ef4444;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .power-button:hover {
            background: #374151;
            box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);
        }

        .power-button:active {
            transform: scale(0.95);
        }

        /* ANIMATIONS */
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        /* ACTION BUTTONS */
        .action-buttons {
            display: flex;
            gap: 1rem;
            width: 100%;
            max-width: 300px;
        }

        .action-btn {
            flex: 1;
            padding: 1rem;
            border: none;
            border-radius: 0.5rem;
            font-size: 0.95rem;
            font-weight: 500;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .action-btn.again {
            background: #3b82f6;
            color: white;
        }

        .action-btn.again:hover {
            background: #2563eb;
            transform: translateY(-2px);
        }

        .action-btn.sleep {
            background: #1f2937;
            color: #e0e0e0;
            border: 1px solid #374151;
        }

        .action-btn.sleep:hover {
            background: #374151;
            border-color: #4b5563;
        }

        @media (max-width: 640px) {
            .main-screen {
                padding: 2rem 1rem;
            }

            .sleep-clock {
                font-size: 2.5rem;
            }

            .carousel-container {
                padding: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <div id="app"></div>

    <script>
        // ============ CONFIG & STATE ============
        const CONFIG = {
            apiUrl: localStorage.getItem('baselineApiUrl') || 'http://localhost:8080',
            coffeeWeight: parseInt(localStorage.getItem('baselineCoffeeWeight')) || 20,
            grinderSetting: parseInt(localStorage.getItem('baselineGrinderSetting')) || 5,
            profile: localStorage.getItem('baselineProfile') || 'default',
            clockFormat: localStorage.getItem('baselineClockFormat') || '24'
        };

        let STATE = {
            screen: 'main', // main, sleep, carousel, brewing, done
            machineState: 'disconnected',
            machineReady: false,
            carouselStep: 0,
            profiles: [],
            currentPressure: 0,
            currentFlow: 0,
            brewingStartTime: null,
            statusCheckInterval: null,
            webSocket: null,
            previousMachineState: null // Track previous state to prevent unnecessary re-renders
        };

        // ============ STORAGE ============
        function saveSettings() {
            localStorage.setItem('baselineApiUrl', CONFIG.apiUrl);
            localStorage.setItem('baselineCoffeeWeight', CONFIG.coffeeWeight);
            localStorage.setItem('baselineGrinderSetting', CONFIG.grinderSetting);
            localStorage.setItem('baselineProfile', CONFIG.profile);
            localStorage.setItem('baselineClockFormat', CONFIG.clockFormat);
        }

        // ============ API CALLS ============
        async function apiCall(endpoint, options = {}) {
            try {
                const response = await fetch(\`\${CONFIG.apiUrl}\${endpoint}\`, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    }
                });
                if (!response.ok) throw new Error(\`API error: \${response.status}\`);
                return await response.json();
            } catch (error) {
                console.error(\`[v0] API call failed for \${endpoint}:\`, error);
                return null;
            }
        }

        async function getMachineState() {
            const data = await apiCall('/api/v1/machine/state');
            if (data) {
                const newState = data.state?.state || 'disconnected';
                STATE.machineState = newState;
                STATE.machineReady = newState === 'idle';
            }
            return data;
        }

        async function getProfiles() {
            const data = await apiCall('/api/v1/profiles');
            if (data && Array.isArray(data)) {
                STATE.profiles = data;
            }
            return data;
        }

        async function setProfile(profileId) {
            return await apiCall('/api/v1/workflow', {
                method: 'POST',
                body: JSON.stringify({ profile: profileId })
            });
        }

        async function connectScale() {
            const devices = await apiCall('/api/v1/devices');
            const scale = devices?.find(d => d.type === 'scale');
            if (scale && scale.state === 'disconnected') {
                return await apiCall(\`/api/v1/devices/connect?deviceId=\${scale.id}\`, {
                    method: 'PUT'
                });
            }
            return null;
        }

        async function startBrewing() {
            return await apiCall('/api/v1/workflow/start', {
                method: 'POST'
            });
        }

        async function sleepMachine() {
            return await apiCall('/api/v1/machine/sleep', {
                method: 'POST'
            });
        }

        function connectWebSocket() {
            const wsUrl = CONFIG.apiUrl.replace('http', 'ws') + '/ws/v1/machine/snapshot';
            try {
                STATE.webSocket = new WebSocket(wsUrl);
                STATE.webSocket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    STATE.currentPressure = data.pressure || 0;
                    STATE.currentFlow = data.flow || 0;
                    renderBrewingVisualization();
                    console.log("have", data.flow, data.pressure);
                };
                STATE.webSocket.onerror = (error) => {
                    console.error('[v0] WebSocket error:', error);
                };
            } catch (error) {
                console.error('[v0] Failed to connect WebSocket:', error);
            }
        }

        function disconnectWebSocket() {
            if (STATE.webSocket) {
                STATE.webSocket.close();
                STATE.webSocket = null;
            }
        }

        // ============ STATUS CHECK ============
        function startStatusCheck() {
            STATE.statusCheckInterval = setInterval(async () => {
                await getMachineState();

                // Only render if state actually changed
                if (STATE.previousMachineState !== STATE.machineState) {
                    STATE.previousMachineState = STATE.machineState;
                    render();
                }

                // Auto-transition to sleep if machine state changes
                if (STATE.machineState === 'sleep' && STATE.screen === 'main') {
                    STATE.screen = 'sleep';
                    render();
                }

                // Auto-transition to brewing visualization
                if (STATE.machineState === 'espresso' && STATE.screen === 'carousel') {
                    STATE.screen = 'brewing';
                    disconnectWebSocket();
                    connectWebSocket();
                    render();
                }

                // Auto-transition to brewing done
                if (STATE.machineState === 'idle' && STATE.screen === 'brewing') {
                    STATE.screen = 'done';
                    disconnectWebSocket();
                    render();
                }
            }, 1000);
        }

        // ============ UI HANDLERS ============
        function openCarousel() {
            STATE.screen = 'carousel';
            STATE.carouselStep = 0;
            render();
        }

        function closeCarousel() {
            STATE.screen = 'main';
            STATE.carouselStep = 0;
            render();
        }

        function nextStep() {
            if (STATE.carouselStep < 6) {
                STATE.carouselStep++;
                renderCarouselOnly();
            }
        }

        function prevStep() {
            if (STATE.carouselStep > 0) {
                STATE.carouselStep--;
                renderCarouselOnly();
            }
        }

        function renderCarouselOnly() {
            const carousel = document.querySelector('.carousel-container');
            if (carousel) {
                const steps = [
                    { title: 'Turn On Scale', description: 'Make sure your scale is turned on and connected to the system.', hasInput: false },
                    { title: 'Weigh Coffee', description: \`Weigh \${CONFIG.coffeeWeight}g of coffee beans and place them in the grinder.\`, hasInput: false },
                    { title: 'Set Grinder', description: \`Set your grinder to setting \${CONFIG.grinderSetting}.\`, hasInput: false },
                    { title: 'Grind', description: 'Grind the coffee until all beans are processed.', hasInput: false },
                    { title: 'Tamp', description: 'Pour the grounds into the portafilter and tamp firmly and evenly.', hasInput: false },
                    { title: 'Insert Portafilter', description: 'Insert and lock the portafilter into the group head, then press the coffee button.', hasInput: false },
                    { title: 'Cup Ready?', description: 'Place your cup underneath the group head to catch the espresso.', hasInput: false }
                ];

                const step = steps[STATE.carouselStep];
                const progress = Array.from({ length: 7 }, (_, i) => \`<div class="progress-dot \${i === STATE.carouselStep ? 'active' : ''}"></div>\`).join('');

                carousel.innerHTML = \`
                    <div class="carousel-progress">\${progress}</div>
                    <div class="carousel-step">
                        <h2>\${step.title}</h2>
                        <p>\${step.description}</p>
                    </div>
                    <div class="carousel-controls">
                        <button class="carousel-btn prev" onclick="prevStep()" \${STATE.carouselStep === 0 ? 'disabled' : ''}>← Back</button>
                        <button class="carousel-btn next" onclick="nextStep()" \${STATE.carouselStep === 6 ? 'disabled' : ''}>Next →</button>
                    </div>
                \`;
            }
        }

        function openSettings() {
            const serverUrl = prompt('Server URL:', CONFIG.apiUrl);
            if (serverUrl !== null) CONFIG.apiUrl = serverUrl;

            const weight = prompt('Coffee Weight (grams):', CONFIG.coffeeWeight);
            if (weight !== null) CONFIG.coffeeWeight = parseInt(weight);

            const grinder = prompt('Grinder Setting:', CONFIG.grinderSetting);
            if (grinder !== null) CONFIG.grinderSetting = parseInt(grinder);

            saveSettings();
            render();
        }

        function makeAnother() {
            disconnectWebSocket();
            STATE.screen = 'main';
            STATE.carouselStep = 0;
            STATE.brewingStartTime = null;
            render();
        }

        async function sleep() {
            disconnectWebSocket();
            STATE.screen = 'sleep';
            render();
        }

        async function sleepMachineAndTransition() {
            await sleepMachine();
            await sleep();
        }

        function wakeUp() {
            STATE.screen = 'main';
            render();
        }

        // ============ RENDERING ============
        function getStatusDisplay() {
            if (STATE.machineState === 'disconnected') {
                return { class: 'disconnected', text: 'Not Connected' };
            }
            if (STATE.machineReady) {
                return { class: 'connected ready', text: 'Ready to Brew' };
            }
            return { class: 'connected not-ready', text: 'Warming Up' };
        }

        function renderMainScreen() {
            const status = getStatusDisplay();
            return \`
                <div class="main-screen">
                    <canvas id="ambientCanvas"></canvas>
                    <button class="power-button" onclick="sleepMachineAndTransition()" title="Sleep Machine">⏻</button>

                    <div class="status-area">
                        <div class="status-indicator">
                            <div class="status-dot \${status.class}"></div>
                            <span>\${status.text}</span>
                        </div>
                        <div class="status-text">\${STATE.machineState}</div>
                    </div>

                    <div class="center-content">
                        <button class="coffee-button" onclick="openCarousel()" \${!STATE.machineReady ? 'disabled' : ''}>
                            ☕ Let's Make Coffee
                        </button>
                    </div>

                    <div class="toolbar">
                        <button class="toolbar-button" onclick="openSettings()" title="Settings">⚙️</button>
                    </div>
                </div>
            \`;
        }

        function renderCarousel() {
            const steps = [
                {
                    title: 'Turn On Scale',
                    description: 'Make sure your scale is turned on and connected to the system.',
                    hasInput: false
                },
                {
                    title: 'Weigh Coffee',
                    description: \`Weigh \${CONFIG.coffeeWeight}g of coffee beans and place them in the grinder.\`,
                    hasInput: false
                },
                {
                    title: 'Set Grinder',
                    description: \`Set your grinder to setting \${CONFIG.grinderSetting}.\`,
                    hasInput: false
                },
                {
                    title: 'Grind',
                    description: 'Grind the coffee until all beans are processed.',
                    hasInput: false
                },
                {
                    title: 'Tamp',
                    description: 'Pour the grounds into the portafilter and tamp firmly and evenly.',
                    hasInput: false
                },
                {
                    title: 'Insert Portafilter',
                    description: 'Insert and lock the portafilter into the group head, then press the coffee button.',
                    hasInput: false
                },
                {
                    title: 'Cup Ready?',
                    description: 'Place your cup underneath the group head to catch the espresso.',
                    hasInput: false
                }
            ];

            const step = steps[STATE.carouselStep];
            const progress = Array.from({ length: 7 }, (_, i) => \`<div class="progress-dot \${i === STATE.carouselStep ? 'active' : ''}"></div>\`).join('');

            return \`
                <div class="carousel-overlay" onclick="event.target === this && closeCarousel()">
                    <canvas id="carouselCanvas"></canvas>
                    <div class="carousel-container">
                        <div class="carousel-progress">\${progress}</div>
                        <div class="carousel-step">
                            <h2>\${step.title}</h2>
                            <p>\${step.description}</p>
                        </div>
                        <div class="carousel-controls">
                            <button class="carousel-btn prev" onclick="prevStep()" \${STATE.carouselStep === 0 ? 'disabled' : ''}>← Back</button>
                            <button class="carousel-btn next" onclick="nextStep()" \${STATE.carouselStep === 6 ? 'disabled' : ''}>Next →</button>
                        </div>
                    </div>
                </div>
            \`;
        }

        function renderBrewingScreen() {
            const elapsed = Math.floor((Date.now() - (STATE.brewingStartTime || Date.now())) / 1000);
            return \`
                <div class="brewing-container">
                    <canvas id="brewingCanvas" width="400" height="400"></canvas>
                    <div class="brewing-info">
                        <div class="brewing-stat">
                            <div class="brewing-stat-value">\${STATE.currentPressure.toFixed(1)}</div>
                            <div class="brewing-stat-label">Bar</div>
                        </div>
                        <div class="brewing-stat">
                            <div class="brewing-stat-value">\${STATE.currentFlow.toFixed(1)}</div>
                            <div class="brewing-stat-label">ml/s</div>
                        </div>
                        <div class="brewing-stat">
                            <div class="brewing-stat-value">\${elapsed}</div>
                            <div class="brewing-stat-label">Sec</div>
                        </div>
                    </div>
                </div>
            \`;
        }

        function renderSleepScreen() {
            const now = new Date();
            let timeString;
            if (CONFIG.clockFormat === '12') {
                timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            } else {
                timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            }

            return \`
                <div class="sleep-screen" onclick="wakeUp()">
                    <canvas id="sleepCanvas" width="800" height="800"></canvas>
                    <div class="sleep-content">
                        <div class="sleep-clock">\${timeString}</div>
                        <div class="sleep-status">Touch to wake</div>
                    </div>
                </div>
            \`;
        }

        function renderDoneScreen() {
            return \`
                <div class="main-screen">
                    <div class="center-content">
                        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">☕ Enjoy!</h1>
                        <p style="opacity: 0.7; margin-bottom: 2rem;">Your espresso is ready.</p>
                        <div class="action-buttons">
                            <button class="action-btn again" onclick="makeAnother()">Make Another</button>
                            <button class="action-btn sleep" onclick="sleep()">Sleep</button>
                        </div>
                    </div>
                </div>
            \`;
        }

        function render() {
            const app = document.getElementById('app');

            // Stop any running ambient animation
            stopAmbientAnimation();

            if (STATE.screen === 'main') {
                app.innerHTML = renderMainScreen();
                setTimeout(() => renderAmbientAnimation('ambientCanvas'), 50);
            } else if (STATE.screen === 'carousel') {
                app.innerHTML = renderMainScreen() + renderCarousel();
                setTimeout(() => renderAmbientAnimation('carouselCanvas'), 50);
            } else if (STATE.screen === 'brewing') {
                app.innerHTML = renderBrewingScreen();
            } else if (STATE.screen === 'sleep') {
                app.innerHTML = renderSleepScreen();
                renderSleepAnimation();
            } else if (STATE.screen === 'done') {
                app.innerHTML = renderDoneScreen();
                setTimeout(() => renderAmbientAnimation('ambientCanvas'), 50);
            }

            if (STATE.screen === 'brewing') {
                setTimeout(renderBrewingVisualization, 50);
            }
        }

        // ============ CANVAS VISUALIZATIONS ============
        // Data-driven particle animation for brewing
        let brewingParticles = null;
        let smoothedPressure = 0;
        let smoothedFlow = 0;
        let smoothedCombined = 0;
        
        function initBrewingParticles() {
            const count = 10; // Further reduced for smoothness
            brewingParticles = Array.from({ length: count }, (_, i) => ({
                offsetX: Math.random() * 600 - 300,
                offsetY: Math.random() * 600 - 300,
                speedX: 0.08 + Math.random() * 0.2,
                speedY: 0.1 + Math.random() * 0.18,
                phaseX: Math.random() * Math.PI * 2,
                phaseY: Math.random() * Math.PI * 2,
                baseSize: 30 + Math.random() * 50,
                pulseSpeed: 0.15 + Math.random() * 0.3,
                pulsePhase: Math.random() * Math.PI * 2,
                pulseAmount: 0.25 + Math.random() * 0.4,
                hue: i % 4 === 0 ? 210 : (i % 4 === 1 ? 180 : (i % 4 === 2 ? 160 : 200)),
                saturation: 60 + Math.random() * 30,
                baseOpacity: 0.08 + Math.random() * 0.12,
                opacitySpeed: 0.12 + Math.random() * 0.2,
                opacityPhase: Math.random() * Math.PI * 2,
            }));
        }
        
        function renderBrewingVisualization() {
            const canvas = document.getElementById('brewingCanvas');
            if (!canvas) return;

            // Resize canvas to match window size
            if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            if (!brewingParticles) initBrewingParticles();

            const ctx = canvas.getContext('2d');
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const time = Date.now() / 1000;

            // Stronger fade effect for smoother trails
            ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Low-pass filter with much stronger smoothing
            const smoothingFactor = 0.03; // Very low for gentle transitions (was 0.08)
            smoothedPressure += (STATE.currentPressure - smoothedPressure) * smoothingFactor;
            smoothedFlow += (STATE.currentFlow - smoothedFlow) * smoothingFactor;
            smoothedCombined += ((STATE.currentPressure + STATE.currentFlow) / 2 - smoothedCombined) * smoothingFactor;

            // Data-driven intensity multipliers using smoothed values with reduced impact
            const pressureIntensity = 1 + smoothedPressure * 0.15; // Reduced from 0.3
            const flowIntensity = 1 + smoothedFlow * 0.2; // Reduced from 0.4
            const combinedIntensity = smoothedCombined * 0.5; // Dampened by 50%

            // Draw particles with data-driven properties
            brewingParticles.forEach((p) => {
                const x = centerX + p.offsetX + Math.sin(time * p.speedX * pressureIntensity + p.phaseX) * 50;
                const y = centerY + p.offsetY + Math.cos(time * p.speedY * flowIntensity + p.phaseY) * 50;
                
                const pulse = Math.sin(time * p.pulseSpeed * flowIntensity + p.pulsePhase) * p.pulseAmount;
                const size = p.baseSize * (1 + pulse) * (1 + combinedIntensity * 0.3);
                const opacityWave = Math.sin(time * p.opacitySpeed + p.opacityPhase) * 0.5 + 0.5;
                const opacity = p.baseOpacity * opacityWave * (1 + combinedIntensity * 0.5);
                
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
                gradient.addColorStop(0, \`hsla(\${p.hue}, \${p.saturation}%, 70%, \${opacity})\`);
                gradient.addColorStop(0.5, \`hsla(\${p.hue}, \${p.saturation}%, 60%, \${opacity * 0.4})\`);
                gradient.addColorStop(1, \`hsla(\${p.hue}, \${p.saturation}%, 50%, 0)\`);
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Breathing overlay driven by brewing data
            const breathe = Math.sin(time * 0.4) * 0.5 + 0.5;
            const dataBreath = breathe * combinedIntensity;
            const overlayGradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, Math.max(canvas.width, canvas.height) / 2
            );
            overlayGradient.addColorStop(0, \`rgba(139, 92, 246, \${dataBreath * 0.08})\`);
            overlayGradient.addColorStop(0.5, \`rgba(59, 130, 246, \${dataBreath * 0.04})\`);
            overlayGradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
            ctx.fillStyle = overlayGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            requestAnimationFrame(renderBrewingVisualization);
        }

        // Ambient background animation for main screen and carousel
        let ambientParticles = null;
        let ambientAnimationFrame = null;
        
        function initAmbientParticles() {
            const count = 25;
            ambientParticles = Array.from({ length: count }, (_, i) => ({
                offsetX: Math.random() * 600 - 300,
                offsetY: Math.random() * 600 - 300,
                speedX: 0.08 + Math.random() * 0.2,
                speedY: 0.1 + Math.random() * 0.18,
                phaseX: Math.random() * Math.PI * 2,
                phaseY: Math.random() * Math.PI * 2,
                baseSize: 30 + Math.random() * 50,
                pulseSpeed: 0.15 + Math.random() * 0.3,
                pulsePhase: Math.random() * Math.PI * 2,
                pulseAmount: 0.25 + Math.random() * 0.4,
                hue: i % 4 === 0 ? 210 : (i % 4 === 1 ? 200 : (i % 4 === 2 ? 220 : 190)),
                saturation: 60 + Math.random() * 30,
                baseOpacity: 0.08 + Math.random() * 0.12,
                opacitySpeed: 0.12 + Math.random() * 0.2,
                opacityPhase: Math.random() * Math.PI * 2,
            }));
        }

        function renderAmbientAnimation(canvasId) {
            const canvas = document.getElementById(canvasId);
            if (!canvas) {
                ambientAnimationFrame = null;
                return;
            }

            // Resize canvas to match window size
            if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            if (!ambientParticles) initAmbientParticles();

            const ctx = canvas.getContext('2d');
            const time = Date.now() / 1000;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Fade effect for subtle trails
            ctx.fillStyle = 'rgba(10, 14, 39, 0.25)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw subtle connection lines
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i < ambientParticles.length; i++) {
                for (let j = i + 1; j < ambientParticles.length; j++) {
                    const p1 = ambientParticles[i];
                    const p2 = ambientParticles[j];
                    
                    const x1 = centerX + p1.offsetX + Math.sin(time * p1.speedX + p1.phaseX) * 200;
                    const y1 = centerY + p1.offsetY + Math.cos(time * p1.speedY + p1.phaseY) * 200;
                    const x2 = centerX + p2.offsetX + Math.sin(time * p2.speedX + p2.phaseX) * 200;
                    const y2 = centerY + p2.offsetY + Math.cos(time * p2.speedY + p2.phaseY) * 200;
                    
                    const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                    
                    if (dist < 180) {
                        const opacity = 0.2 * (1 - dist / 180);
                        ctx.strokeStyle = \`rgba(59, 130, 246, \${opacity * 0.08})\`;
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            ambientParticles.forEach((p) => {
                const x = centerX + p.offsetX + Math.sin(time * p.speedX + p.phaseX) * 200;
                const y = centerY + p.offsetY + Math.cos(time * p.speedY + p.phaseY) * 200;
                
                const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * p.pulseAmount;
                const size = p.baseSize * (1 + pulse);
                const opacityWave = Math.sin(time * p.opacitySpeed + p.opacityPhase) * 0.5 + 0.5;
                const opacity = p.baseOpacity * opacityWave;
                
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
                gradient.addColorStop(0, \`hsla(\${p.hue}, \${p.saturation}%, 70%, \${opacity})\`);
                gradient.addColorStop(0.5, \`hsla(\${p.hue}, \${p.saturation}%, 60%, \${opacity * 0.4})\`);
                gradient.addColorStop(1, \`hsla(\${p.hue}, \${p.saturation}%, 50%, 0)\`);
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Subtle breathing overlay
            const breathe = Math.sin(time * 0.3) * 0.5 + 0.5;
            const overlayGradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, Math.max(canvas.width, canvas.height) / 2
            );
            overlayGradient.addColorStop(0, \`rgba(59, 130, 246, \${breathe * 0.02})\`);
            overlayGradient.addColorStop(0.6, \`rgba(99, 102, 241, \${breathe * 0.015})\`);
            overlayGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
            ctx.fillStyle = overlayGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ambientAnimationFrame = requestAnimationFrame(() => renderAmbientAnimation(canvasId));
        }

        function stopAmbientAnimation() {
            if (ambientAnimationFrame) {
                cancelAnimationFrame(ambientAnimationFrame);
                ambientAnimationFrame = null;
            }
        }

        // Sleep animation particles with unique properties
        let sleepParticles = null;
        
        function initSleepParticles() {
            const count = 40;
            sleepParticles = Array.from({ length: count }, (_, i) => ({
                // Random offsets for organic movement
                offsetX: Math.random() * 400 - 200,
                offsetY: Math.random() * 400 - 200,
                // Unique speed and phase for each particle
                speedX: 0.1 + Math.random() * 0.3,
                speedY: 0.15 + Math.random() * 0.25,
                phaseX: Math.random() * Math.PI * 2,
                phaseY: Math.random() * Math.PI * 2,
                // Random size and pulsing characteristics
                baseSize: 20 + Math.random() * 60,
                pulseSpeed: 0.2 + Math.random() * 0.4,
                pulsePhase: Math.random() * Math.PI * 2,
                pulseAmount: 0.3 + Math.random() * 0.5,
                // Color variation
                hue: i % 3 === 0 ? 210 : (i % 3 === 1 ? 180 : 220),
                saturation: 50 + Math.random() * 30,
                // Opacity characteristics
                baseOpacity: 0.05 + Math.random() * 0.12,
                opacitySpeed: 0.15 + Math.random() * 0.25,
                opacityPhase: Math.random() * Math.PI * 2,
                // Trail effect
                trailLength: 3 + Math.floor(Math.random() * 5),
                trail: []
            }));
        }

        function renderSleepAnimation() {
            const canvas = document.getElementById('sleepCanvas');
            if (!canvas) return;

            // Resize canvas to match window size
            if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            if (!sleepParticles) initSleepParticles();

            const ctx = canvas.getContext('2d');
            const time = Date.now() / 1000;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Fade effect instead of clear for trails
            ctx.fillStyle = 'rgba(10, 14, 39, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw connection lines between nearby particles
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
            ctx.lineWidth = 1;
            for (let i = 0; i < sleepParticles.length; i++) {
                for (let j = i + 1; j < sleepParticles.length; j++) {
                    const p1 = sleepParticles[i];
                    const p2 = sleepParticles[j];
                    
                    const x1 = centerX + p1.offsetX + Math.sin(time * p1.speedX + p1.phaseX) * 180;
                    const y1 = centerY + p1.offsetY + Math.cos(time * p1.speedY + p1.phaseY) * 180;
                    const x2 = centerX + p2.offsetX + Math.sin(time * p2.speedX + p2.phaseX) * 180;
                    const y2 = centerY + p2.offsetY + Math.cos(time * p2.speedY + p2.phaseY) * 180;
                    
                    const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                    
                    if (dist < 150) {
                        const opacity = 0.3 * (1 - dist / 150);
                        ctx.strokeStyle = \`rgba(59, 130, 246, \${opacity * 0.15})\`;
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();
                    }
                }
            }

            // Draw each particle with trails
            sleepParticles.forEach((p, i) => {
                const x = centerX + p.offsetX + Math.sin(time * p.speedX + p.phaseX) * 180;
                const y = centerY + p.offsetY + Math.cos(time * p.speedY + p.phaseY) * 180;
                
                // Update trail
                p.trail.push({ x, y });
                if (p.trail.length > p.trailLength) p.trail.shift();
                
                // Draw trail
                p.trail.forEach((pos, idx) => {
                    const trailOpacity = (idx / p.trail.length) * p.baseOpacity * 0.3;
                    const trailSize = p.baseSize * 0.3 * (idx / p.trail.length);
                    
                    ctx.fillStyle = \`hsla(\${p.hue}, \${p.saturation}%, 60%, \${trailOpacity})\`;
                    ctx.beginPath();
                    ctx.arc(pos.x, pos.y, trailSize, 0, Math.PI * 2);
                    ctx.fill();
                });
                
                // Calculate dynamic properties
                const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * p.pulseAmount;
                const size = p.baseSize * (1 + pulse);
                const opacityWave = Math.sin(time * p.opacitySpeed + p.opacityPhase) * 0.5 + 0.5;
                const opacity = p.baseOpacity * opacityWave;
                
                // Draw main particle with gradient
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
                gradient.addColorStop(0, \`hsla(\${p.hue}, \${p.saturation}%, 70%, \${opacity})\`);
                gradient.addColorStop(0.5, \`hsla(\${p.hue}, \${p.saturation}%, 60%, \${opacity * 0.5})\`);
                gradient.addColorStop(1, \`hsla(\${p.hue}, \${p.saturation}%, 50%, 0)\`);
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
                
                // Add occasional sparkle effect
                if (Math.sin(time * 2 + i) > 0.95) {
                    ctx.fillStyle = \`rgba(255, 255, 255, \${0.3 + Math.random() * 0.3})\`;
                    ctx.beginPath();
                    ctx.arc(x, y, 2 + Math.random() * 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            
            // Breathing overlay effect
            const breathe = Math.sin(time * 0.4) * 0.5 + 0.5;
            const overlayGradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, Math.max(canvas.width, canvas.height) / 2
            );
            overlayGradient.addColorStop(0, \`rgba(59, 130, 246, \${breathe * 0.03})\`);
            overlayGradient.addColorStop(0.5, \`rgba(139, 92, 246, \${breathe * 0.02})\`);
            overlayGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
            ctx.fillStyle = overlayGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            requestAnimationFrame(renderSleepAnimation);
        }

        // ============ INITIALIZATION ============
        async function init() {
            console.log('[v0] Baseline starting...');
            startStatusCheck();
            await getMachineState();
            await getProfiles();
            render();

            // Update brewing stats and sleep clock without full re-render
            setInterval(() => {
                if (STATE.screen === 'brewing') {
                    const elapsed = Math.floor((Date.now() - (STATE.brewingStartTime || Date.now())) / 1000);
                    const pressureEl = document.querySelector('.brewing-stat-value');
                    if (pressureEl) {
                        const stats = document.querySelectorAll('.brewing-stat-value');
                        if (stats.length >= 3) {
                            stats[0].textContent = STATE.currentPressure.toFixed(1);
                            stats[1].textContent = STATE.currentFlow.toFixed(1);
                            stats[2].textContent = elapsed;
                        }
                    }
                }
                if (STATE.screen === 'sleep') {
                    // Update clock only
                    const clockEl = document.querySelector('.sleep-clock');
                    if (clockEl) {
                        const now = new Date();
                        let timeString;
                        if (CONFIG.clockFormat === '12') {
                            timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                        } else {
                            timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
                        }
                        clockEl.textContent = timeString;
                    }
                }
            }, 1000);
        }

        // Start the app
        init();
    </script>
</body>
</html>`
      }}
      style={{ width: '100%', height: '100vh' }}
    />
  );
}

























