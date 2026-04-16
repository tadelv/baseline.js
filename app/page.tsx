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
        :root {
            /* Background tones */
            --bg-base: #0a0e27;
            --bg-subtle: #0f1520;
            --bg-surface: #1f2937;
            --bg-surface-hover: #374151;
            --bg-overlay: rgba(10, 14, 39, 0.95);
            --bg-card: rgba(17, 24, 39, 0.7);

            /* Text */
            --text-primary: #e0e0e0;
            --text-muted: #9ca3af;
            --text-faint: #6b7280;

            /* Accent — blue */
            --accent: #3b82f6;
            --accent-hover: #2563eb;
            --accent-deep: #1e40af;
            --accent-glow: rgba(59, 130, 246, 0.4);
            --accent-glow-strong: rgba(59, 130, 246, 0.6);
            --accent-border: rgba(59, 130, 246, 0.3);
            --accent-border-subtle: rgba(59, 130, 246, 0.2);
            --accent-surface: rgba(59, 130, 246, 0.9);

            /* Secondary button */
            --btn-secondary: rgba(55, 65, 81, 0.7);
            --btn-secondary-hover: rgba(75, 85, 99, 0.9);
            --btn-secondary-border: rgba(75, 85, 99, 0.5);

            /* Semantic */
            --status-ready: #4ade80;
            --status-ready-glow: rgba(74, 222, 128, 0.6);
            --status-warming: #fbbf24;
            --status-warming-glow: rgba(251, 191, 36, 0.6);
            --status-error: #ef4444;
            --status-error-glow: rgba(239, 68, 68, 0.6);
            --status-neutral: #666;

            /* Input */
            --input-bg: #1f2937;
            --input-border: #374151;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: var(--bg-base);
            color: var(--text-primary);
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
            background: var(--status-neutral);
            transition: background 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 0 8px rgba(102, 102, 102, 0.3);
        }

        .status-dot.connected.ready {
            background: var(--status-ready);
            box-shadow: 0 0 16px var(--status-ready-glow);
        }

        .status-dot.connected.not-ready {
            background: var(--status-warming);
            box-shadow: 0 0 16px var(--status-warming-glow);
        }

        .status-dot.disconnected {
            background: var(--status-error);
            box-shadow: 0 0 16px var(--status-error-glow);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .status-text {
            text-align: center;
            font-size: 0.85rem;
            color: var(--text-muted);
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
            background: linear-gradient(135deg, var(--accent-surface) 0%, rgba(30, 64, 175, 0.9) 100%);
            color: white;
            border: 1px solid var(--accent-border);
            border-radius: 0.5rem;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, opacity 0.3s ease;
            box-shadow: 0 8px 32px var(--accent-glow), 0 0 60px rgba(59, 130, 246, 0.2);
            position: relative;
            overflow: hidden;
        }

        .coffee-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px var(--accent-glow-strong), 0 0 80px var(--accent-border);
            background: linear-gradient(135deg, var(--accent) 0%, var(--accent-deep) 100%);
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
            background: var(--bg-overlay);
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
            background: var(--bg-card);
            border: 1px solid var(--accent-border-subtle);
            border-radius: 1rem;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(59, 130, 246, 0.1);
            position: relative;
            z-index: 10;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
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
            background: var(--bg-surface-hover);
            transition: background 0.3s ease, transform 0.3s ease;
        }

        .progress-dot.active {
            background: var(--accent);
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
            color: var(--text-muted);
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }

        .carousel-step input {
            background: var(--input-bg);
            border: 1px solid var(--input-border);
            color: var(--text-primary);
            padding: 0.75rem 1rem;
            border-radius: 0.375rem;
            margin-bottom: 1rem;
            font-size: 1rem;
            width: 100%;
            transition: border-color 0.2s;
        }

        .carousel-step input:focus {
            border-color: var(--accent);
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
            transition: background 0.2s, box-shadow 0.2s, opacity 0.2s;
            font-weight: 500;
        }

        .carousel-btn.prev {
            background: var(--btn-secondary);
            color: var(--text-primary);
            border: 1px solid var(--btn-secondary-border);
        }

        .carousel-btn.prev:hover:not(:disabled) {
            background: var(--btn-secondary-hover);
        }

        .carousel-btn.next {
            background: var(--accent-surface);
            color: white;
            border: 1px solid var(--accent-border);
        }

        .carousel-btn.next:hover:not(:disabled) {
            background: var(--accent-hover);
            box-shadow: 0 4px 16px var(--accent-glow);
        }

        .carousel-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* BREWING VISUALIZATION */
        .brewing-container {
            position: fixed;
            inset: 0;
            background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-subtle) 100%);
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
            color: var(--status-ready);
        }

        .brewing-stat-label {
            font-size: 0.8rem;
            color: var(--text-faint);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        /* SLEEP SCREEN */
        .sleep-screen {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--bg-base) 0%, var(--bg-subtle) 100%);
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
            color: var(--text-faint);
            font-weight: 500;
        }

        .sleep-wake {
            padding: 1rem 2rem;
            background: var(--accent);
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-size: 0.95rem;
            font-weight: 500;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            cursor: pointer;
            transition: background 0.3s ease, transform 0.3s ease;
        }

        .sleep-wake:hover {
            background: var(--accent-hover);
            transform: translateY(-2px);
        }

        /* SETTINGS */
        .settings-overlay {
            position: fixed;
            inset: 0;
            background: var(--bg-overlay);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 200;
            animation: fadeIn 0.3s ease-in;
        }

        .settings-dialog {
            background: var(--bg-card);
            border: 1px solid var(--accent-border-subtle);
            border-radius: 1rem;
            padding: 2rem;
            max-width: 450px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(59, 130, 246, 0.1);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
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
            color: var(--text-muted);
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.03em;
        }

        .setting-input {
            width: 100%;
            background: var(--input-bg);
            border: 1px solid var(--input-border);
            color: var(--text-primary);
            padding: 0.75rem 1rem;
            border-radius: 0.375rem;
            font-size: 1rem;
            transition: border-color 0.2s;
            -webkit-appearance: none;
            appearance: none;
        }

        select.setting-input {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 0.75rem center;
            padding-right: 2.5rem;
        }

        .setting-input:focus {
            border-color: var(--accent);
        }

        .settings-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: var(--text-primary);
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-faint);
            transition: color 0.2s;
        }

        .settings-close:hover {
            color: var(--text-primary);
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
            transition: background 0.2s, box-shadow 0.2s, opacity 0.2s;
            font-weight: 500;
        }

        .settings-button.save {
            background: var(--accent-surface);
            color: white;
            border: 1px solid var(--accent-border);
            box-shadow: 0 4px 16px var(--accent-glow);
        }

        .settings-button.save:hover {
            background: var(--accent-hover);
            box-shadow: 0 6px 20px var(--accent-glow-strong);
        }

        .settings-button.cancel {
            background: var(--btn-secondary);
            color: var(--text-primary);
            border: 1px solid var(--btn-secondary-border);
        }

        .settings-button.cancel:hover {
            background: var(--btn-secondary-hover);
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
            background: var(--bg-surface);
            border: 1px solid var(--input-border);
            color: var(--text-primary);
            font-size: 1.1rem;
            cursor: pointer;
            transition: background 0.2s, border-color 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .toolbar-button:hover {
            background: var(--bg-surface-hover);
            border-color: var(--btn-secondary-border);
        }

        /* POWER BUTTON */
        .power-button {
            position: absolute;
            top: 1.5rem;
            left: 1.5rem;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: var(--bg-surface);
            border: 2px solid var(--status-error);
            color: var(--status-error);
            font-size: 1.2rem;
            cursor: pointer;
            transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .power-button:hover {
            background: var(--bg-surface-hover);
            box-shadow: 0 0 12px var(--status-error-glow);
        }

        .power-button:active {
            transform: scale(0.95);
        }

        .power-button svg {
            width: 1.5rem;
            height: 1.5rem;
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
            transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }

        .action-btn.again {
            background: var(--accent-surface);
            color: white;
            border: 1px solid var(--accent-border);
            box-shadow: 0 4px 20px var(--accent-glow);
        }

        .action-btn.again:hover {
            background: var(--accent-hover);
            transform: translateY(-2px);
            box-shadow: 0 6px 24px var(--accent-glow-strong);
        }

        .action-btn.sleep {
            background: var(--btn-secondary);
            color: var(--text-primary);
            border: 1px solid var(--btn-secondary-border);
        }

        .action-btn.sleep:hover {
            background: var(--btn-secondary-hover);
            border-color: rgba(75, 85, 99, 0.8);
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

        /* FOCUS STYLES */
        :focus-visible {
            outline: 2px solid var(--accent);
            outline-offset: 2px;
        }

        .coffee-button:focus-visible {
            box-shadow: 0 8px 32px var(--accent-glow), 0 0 0 3px var(--accent-glow-strong);
        }

        .carousel-step input:focus-visible,
        .setting-input:focus-visible {
            outline: 2px solid var(--accent);
            outline-offset: -1px;
            border-color: var(--accent);
        }

        /* TEMPERATURE & WATER DISPLAY */
        .temperature-display {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 0.25rem;
        }

        .water-level-display {
            font-size: 0.85rem;
            color: var(--text-faint);
            margin-top: 0.25rem;
        }

        /* DONE SCREEN */
        .done-title {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        .done-subtitle {
            color: var(--text-muted);
            margin-bottom: 2rem;
        }

        /* WEIGHT DISPLAY */
        .weight-display {
            font-size: 1.2rem;
            font-weight: 600;
            margin-top: 1rem;
        }

        .tare-btn {
            margin-top: 0.5rem;
            padding: 0.4rem 1.2rem;
            background: rgba(59, 130, 246, 0.2);
            border: 1px solid var(--accent-glow);
            color: var(--accent);
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 0.85rem;
        }

        .tare-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* MACHINE INFO */
        .setting-group-divider {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 1rem;
            margin-top: 0.5rem;
        }

        .machine-info-text {
            font-size: 0.85rem;
            color: var(--text-faint);
            line-height: 1.6;
        }

        /* MACHINE SETTINGS (Level 2) */
        .machine-settings-screen {
            position: fixed;
            inset: 0;
            background: var(--bg-base);
            z-index: 300;
            animation: slideInRight 0.3s ease-out;
            overflow-y: auto;
        }

        @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }

        .machine-settings-container {
            max-width: 500px;
            margin: 0 auto;
            padding: 2rem;
        }

        .machine-settings-back {
            background: none;
            border: none;
            color: var(--accent);
            font-size: 1.1rem;
            font-weight: 500;
            cursor: pointer;
            padding: 0.5rem 0;
            margin-bottom: 1.5rem;
            display: block;
            transition: opacity 0.2s;
        }

        .machine-settings-back:hover {
            opacity: 0.8;
        }

        .machine-settings-section {
            margin-bottom: 2rem;
        }

        .machine-settings-section-title {
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--text-muted);
            font-weight: 600;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .machine-settings-btn {
            width: 100%;
            padding: 0.75rem 1rem;
            background: var(--btn-secondary);
            color: var(--text-primary);
            border: 1px solid var(--btn-secondary-border);
            border-radius: 0.375rem;
            font-size: 0.95rem;
            font-weight: 500;
            cursor: pointer;
            text-align: left;
            transition: background 0.2s;
        }

        .machine-settings-btn:hover {
            background: var(--btn-secondary-hover);
        }

        /* REDUCED MOTION */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }

        /* VISUALLY HIDDEN (for screen reader text) */
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
    </style>
</head>
<body>
    <div id="app"></div>

    <script>
        // ============ CONFIG & STATE ============
        const CONFIG = {
            apiUrl: localStorage.getItem('baselineApiUrl') || (window.location.protocol + '//' + window.location.hostname + ':8080'),
            clockFormat: localStorage.getItem('baselineClockFormat') || '24',
            profile: 'default',
            coffeeWeight: 20,
            grinderSetting: 5,
            steam: { targetTemperature: 150, duration: 50, flow: 0.8 },
            hotWater: { targetTemperature: 75, duration: 30, volume: 50, flow: 10.0 },
            rinse: { targetTemperature: 90, duration: 10, flow: 6.0 }
        };

        let STATE = {
            screen: 'main', // main, sleep, carousel, brewing, done, settings
            machineState: 'disconnected',
            machineReady: false,
            carouselStep: 0,
            profiles: [],
            currentPressure: 0,
            currentFlow: 0,
            currentTemperature: 0,
            steamTemperature: 0,
            brewingStartTime: null,
            machineSnapshotWs: null,
            scaleWebSocket: null,
            previousMachineState: null, // Track previous state to prevent unnecessary re-renders
            scaleConnected: false,
            scaleScanInterval: null,
            devicesWs: null,
            ghcHintTimer: null,
            showGhcHint: false,
            currentWeight: 0,
            targetWeightReached: false,
            machineInfo: null,
            buildInfo: null,
            waterLevelMm: 0,
            waterLevelLiters: 0,
            waterLevelWs: null,
            displayWs: null,
            displayState: null
        };

        // Water level mm-to-ml lookup table (from DE1 TCL implementation)
        // Index = mm, value = ml. Raw reading gets +5mm correction.
        const WATER_MM_TO_ML = [
            0, 16, 43, 70, 97, 124, 151, 179, 206, 233,
            261, 288, 316, 343, 371, 398, 426, 453, 481, 509,
            537, 564, 592, 620, 648, 676, 704, 732, 760, 788,
            816, 844, 872, 900, 929, 957, 985, 1013, 1042, 1070,
            1104, 1138, 1172, 1207, 1242, 1277, 1312, 1347, 1382, 1417,
            1453, 1488, 1523, 1559, 1594, 1630, 1665, 1701, 1736, 1772,
            1808, 1843, 1879, 1915, 1951, 1986, 2022, 2058
        ];

        function waterMmToLiters(rawMm) {
            const correctedMm = rawMm + 5;
            const index = Math.min(Math.floor(correctedMm), WATER_MM_TO_ML.length - 1);
            if (index < 0) return 0;
            const ml = WATER_MM_TO_ML[index] ?? 2058;
            return ml / 1000;
        }

        // ============ STORAGE (KV Store + localStorage) ============
        function saveSettings() {
            localStorage.setItem('baselineApiUrl', CONFIG.apiUrl);
            localStorage.setItem('baselineClockFormat', CONFIG.clockFormat);
            apiCall('/api/v1/store/baseline/config', {
                method: 'POST',
                body: JSON.stringify({ clockFormat: CONFIG.clockFormat })
            });
        }

        function saveWorkflowToKv() {
            apiCall('/api/v1/store/baseline/workflow', {
                method: 'POST',
                body: JSON.stringify({
                    profileId: CONFIG.profile,
                    coffeeWeight: CONFIG.coffeeWeight,
                    grinderSetting: CONFIG.grinderSetting,
                    steam: CONFIG.steam,
                    hotWater: CONFIG.hotWater,
                    rinse: CONFIG.rinse
                })
            });
        }

        async function pushWorkflowToMachine() {
            const profile = STATE.profiles.find(p => p.id === CONFIG.profile);
            const workflow = {
                context: {
                    targetDoseWeight: parseFloat(CONFIG.coffeeWeight),
                    grinderSetting: String(CONFIG.grinderSetting)
                },
                steamSettings: { ...CONFIG.steam },
                hotWaterData: { ...CONFIG.hotWater },
                rinseData: { ...CONFIG.rinse }
            };
            if (profile) workflow.profile = profile.profile;
            return await apiCall('/api/v1/workflow', {
                method: 'PUT',
                body: JSON.stringify(workflow)
            });
        }

        async function loadWorkflowFromMachine() {
            const wf = await apiCall('/api/v1/workflow');
            if (!wf) return;
            if (wf.context?.targetDoseWeight != null) CONFIG.coffeeWeight = wf.context.targetDoseWeight;
            if (wf.context?.grinderSetting != null) CONFIG.grinderSetting = parseFloat(wf.context.grinderSetting) || CONFIG.grinderSetting;
            if (wf.steamSettings) CONFIG.steam = { ...CONFIG.steam, ...wf.steamSettings };
            if (wf.hotWaterData) CONFIG.hotWater = { ...CONFIG.hotWater, ...wf.hotWaterData };
            if (wf.rinseData) CONFIG.rinse = { ...CONFIG.rinse, ...wf.rinseData };
        }

        async function loadSettingsFromKvStore() {
            const config = await apiCall('/api/v1/store/baseline/config');
            if (config?.clockFormat != null) CONFIG.clockFormat = config.clockFormat;

            const workflow = await apiCall('/api/v1/store/baseline/workflow');
            if (workflow) {
                if (workflow.profileId != null) CONFIG.profile = workflow.profileId;
                if (workflow.coffeeWeight != null) CONFIG.coffeeWeight = parseFloat(workflow.coffeeWeight);
                if (workflow.grinderSetting != null) CONFIG.grinderSetting = parseFloat(workflow.grinderSetting);
                if (workflow.steam) CONFIG.steam = { ...CONFIG.steam, ...workflow.steam };
                if (workflow.hotWater) CONFIG.hotWater = { ...CONFIG.hotWater, ...workflow.hotWater };
                if (workflow.rinse) CONFIG.rinse = { ...CONFIG.rinse, ...workflow.rinse };
            } else if (config?.profile || config?.coffeeWeight) {
                // Migrate from legacy config key
                await loadWorkflowFromMachine();
                if (config.profile != null) CONFIG.profile = config.profile;
                if (config.coffeeWeight != null) CONFIG.coffeeWeight = parseFloat(config.coffeeWeight);
                if (config.grinderSetting != null) CONFIG.grinderSetting = parseFloat(config.grinderSetting);
                saveWorkflowToKv();
            } else {
                await loadWorkflowFromMachine();
            }
        }

        // ============ API LAYER ============
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
                const text = await response.text();
                return text ? JSON.parse(text) : null;
            } catch (error) {
                console.error(\`[v0] API call failed for \${endpoint}:\`, error);
                return null;
            }
        }

        function updateMachineState(data) {
            if (!data) return;
            const newState = data.state?.state || 'disconnected';
            STATE.machineState = newState;
            STATE.machineReady = newState === 'idle';
            STATE.currentTemperature = data.groupTemperature || data.mixTemperature || 0;
            STATE.steamTemperature = data.steamTemperature || 0;
        }

        async function getMachineState() {
            const data = await apiCall('/api/v1/machine/state');
            updateMachineState(data);
            return data;
        }

        async function getMachineInfo() {
            const data = await apiCall('/api/v1/machine/info');
            if (data) STATE.machineInfo = data;
            return data;
        }

        async function getBuildInfo() {
            const data = await apiCall('/api/v1/info');
            if (data) STATE.buildInfo = data;
            return data;
        }

        async function getProfiles() {
            const data = await apiCall('/api/v1/profiles');
            if (data && Array.isArray(data)) {
                STATE.profiles = data;
            }
            return data;
        }

        function connectDevicesWebSocket() {
            const wsUrl = CONFIG.apiUrl.replace('http', 'ws') + '/ws/v1/devices';
            try {
                STATE.devicesWs = new WebSocket(wsUrl);
                STATE.devicesWs.onmessage = (event) => {
                    const data = JSON.parse(event.data);

                    // Check scale connection state from devices list
                    const scale = data.devices?.find(d => d.type === 'scale');
                    const wasConnected = STATE.scaleConnected;
                    STATE.scaleConnected = scale && scale.state === 'connected';

                    // Handle ambiguity: auto-select first available scale
                    if (data.connectionStatus?.pendingAmbiguity === 'scalePicker') {
                        const scales = data.connectionStatus.foundScales;
                        if (scales && scales.length > 0) {
                            STATE.devicesWs.send(JSON.stringify({
                                command: 'connect',
                                deviceId: scales[0].id
                            }));
                        }
                    }

                    // Update carousel if scale connection changed
                    if (wasConnected !== STATE.scaleConnected && STATE.screen === 'carousel') {
                        renderCarouselOnly();
                    }
                };
                STATE.devicesWs.onopen = () => resetReconnectDelay('devices');
                STATE.devicesWs.onclose = () => {
                    setTimeout(connectDevicesWebSocket, getReconnectDelay('devices'));
                };
                STATE.devicesWs.onerror = (error) => {
                    console.error('[v0] Devices WebSocket error:', error);
                };
            } catch (error) {
                console.error('[v0] Failed to connect devices WebSocket:', error);
            }
        }

        function disconnectDevicesWebSocket() {
            if (STATE.devicesWs) {
                STATE.devicesWs.close();
                STATE.devicesWs = null;
            }
        }

        async function connectScale() {
            // Ensure devices WebSocket is connected
            if (!STATE.devicesWs || STATE.devicesWs.readyState !== WebSocket.OPEN) {
                connectDevicesWebSocket();
                // Wait for connection
                await new Promise(resolve => {
                    const check = setInterval(() => {
                        if (STATE.devicesWs?.readyState === WebSocket.OPEN) {
                            clearInterval(check);
                            resolve();
                        }
                    }, 100);
                    setTimeout(() => { clearInterval(check); resolve(); }, 3000);
                });
            }

            // Send scan command via WebSocket
            if (STATE.devicesWs?.readyState === WebSocket.OPEN) {
                STATE.devicesWs.send(JSON.stringify({
                    command: 'scan',
                    connect: true
                }));
            }
        }

        async function tareScale() {
            const result = await apiCall('/api/v1/scale/tare', {
                method: 'PUT'
            });
            if (!result) {
                console.warn('[v0] Tare not supported by this scale');
            }
            return result;
        }

        // ============ WEBSOCKETS ============
        // Exponential backoff for reconnections
        const wsReconnectDelays = {};
        function getReconnectDelay(wsName) {
            if (!wsReconnectDelays[wsName]) wsReconnectDelays[wsName] = 5000;
            const delay = wsReconnectDelays[wsName];
            wsReconnectDelays[wsName] = Math.min(delay * 2, 60000);
            return delay;
        }
        function resetReconnectDelay(wsName) {
            wsReconnectDelays[wsName] = 5000;
        }
        function connectScaleWebSocket() {
            const wsUrl = CONFIG.apiUrl.replace('http', 'ws') + '/ws/v1/scale/snapshot';
            try {
                STATE.scaleWebSocket = new WebSocket(wsUrl);
                STATE.scaleWebSocket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    STATE.currentWeight = data.weight || 0;
                    
                    // Check if target weight is reached (within 0.5g tolerance)
                    if (Math.abs(STATE.currentWeight - CONFIG.coffeeWeight) <= 0.5) {
                        STATE.targetWeightReached = true;
                    } else {
                        STATE.targetWeightReached = false;
                    }
                    
                    // Update the carousel display if on weight step
                    if (STATE.carouselStep === 1) {
                        updateWeightDisplay();
                    }
                };
                STATE.scaleWebSocket.onerror = (error) => {
                    console.error('[v0] Scale WebSocket error:', error);
                };
            } catch (error) {
                console.error('[v0] Failed to connect Scale WebSocket:', error);
            }
        }

        function disconnectScaleWebSocket() {
            if (STATE.scaleWebSocket) {
                STATE.scaleWebSocket.close();
                STATE.scaleWebSocket = null;
            }
            STATE.currentWeight = 0;
            STATE.targetWeightReached = false;
        }

        async function startBrewing() {
            return await apiCall('/api/v1/machine/state/espresso', {
                method: 'PUT'
            });
        }

        async function sleepMachine() {
            return await apiCall('/api/v1/machine/state/sleeping', {
                method: 'PUT'
            });
        }

        async function wakeMachine() {
            return await apiCall('/api/v1/machine/state/idle', {
                method: 'PUT'
            });
        }

        function connectMachineSnapshotWebSocket() {
            const wsUrl = CONFIG.apiUrl.replace('http', 'ws') + '/ws/v1/machine/snapshot';
            try {
                STATE.machineSnapshotWs = new WebSocket(wsUrl);
                STATE.machineSnapshotWs.onmessage = (event) => {
                    const data = JSON.parse(event.data);

                    // Update machine state from snapshot
                    updateMachineState(data);
                    updateTemperatureDisplay();

                    if (STATE.previousMachineState !== STATE.machineState) {
                        STATE.previousMachineState = STATE.machineState;
                        render();
                    }

                    // Auto-transition to sleep
                    if (STATE.machineState === 'sleeping' && STATE.screen === 'main') {
                        STATE.screen = 'sleep';
                        setDisplayBrightness(5);
                        render();
                    }

                    // Auto-transition to brewing visualization
                    if (STATE.machineState === 'espresso' && STATE.screen === 'carousel') {
                        cancelGhcHint();
                        STATE.screen = 'brewing';
                        STATE.brewingStartTime = Date.now();
                        render();
                    }

                    // Auto-transition to brewing done
                    if (STATE.machineState === 'idle' && STATE.screen === 'brewing') {
                        STATE.screen = 'done';
                        render();
                    }

                    // Update brewing data when on brewing screen
                    if (STATE.screen === 'brewing') {
                        STATE.currentPressure = data.pressure || 0;
                        STATE.currentFlow = data.flow || 0;
                        // Animation loop is already running via requestAnimationFrame;
                        // just update the data, don't start another loop
                    }
                };
                STATE.machineSnapshotWs.onopen = () => resetReconnectDelay('machineSnapshot');
                STATE.machineSnapshotWs.onclose = () => {
                    setTimeout(connectMachineSnapshotWebSocket, getReconnectDelay('machineSnapshot'));
                };
                STATE.machineSnapshotWs.onerror = (error) => {
                    console.error('[v0] Machine snapshot WebSocket error:', error);
                };
            } catch (error) {
                console.error('[v0] Failed to connect machine snapshot WebSocket:', error);
            }
        }

        function connectWaterLevelWebSocket() {
            const wsUrl = CONFIG.apiUrl.replace('http', 'ws') + '/ws/v1/machine/waterLevels';
            try {
                STATE.waterLevelWs = new WebSocket(wsUrl);
                STATE.waterLevelWs.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    STATE.waterLevelMm = data.currentLevel || 0;
                    STATE.waterLevelLiters = waterMmToLiters(STATE.waterLevelMm);
                    updateWaterLevelDisplay();
                };
                STATE.waterLevelWs.onopen = () => resetReconnectDelay('waterLevel');
                STATE.waterLevelWs.onclose = () => {
                    setTimeout(connectWaterLevelWebSocket, getReconnectDelay('waterLevel'));
                };
                STATE.waterLevelWs.onerror = (error) => {
                    console.error('[v0] Water level WebSocket error:', error);
                };
            } catch (error) {
                console.error('[v0] Failed to connect water level WebSocket:', error);
            }
        }

        function updateTemperatureDisplay() {
            const el = document.querySelector('.temperature-display');
            if (el) {
                el.textContent = STATE.currentTemperature > 0 ? STATE.currentTemperature.toFixed(1) + '\u00B0C' : '';
            }
        }

        function updateWaterLevelDisplay() {
            const el = document.querySelector('.water-level-display');
            if (el) {
                el.textContent = STATE.waterLevelLiters.toFixed(1) + 'L';
                el.style.color = STATE.waterLevelLiters < 0.3 ? 'var(--status-error)' : '';
            }
        }

        function connectDisplayWebSocket() {
            const wsUrl = CONFIG.apiUrl.replace('http', 'ws') + '/ws/v1/display';
            try {
                STATE.displayWs = new WebSocket(wsUrl);
                STATE.displayWs.onopen = () => {
                    resetReconnectDelay('display');
                    STATE.displayWs.send(JSON.stringify({ command: 'requestWakeLock' }));
                };
                STATE.displayWs.onmessage = (event) => {
                    STATE.displayState = JSON.parse(event.data);
                };
                STATE.displayWs.onclose = () => {
                    setTimeout(connectDisplayWebSocket, getReconnectDelay('display'));
                };
                STATE.displayWs.onerror = (error) => {
                    console.error('[v0] Display WebSocket error:', error);
                };
            } catch (error) {
                console.error('[v0] Failed to connect display WebSocket:', error);
            }
        }

        function setDisplayBrightness(brightness) {
            if (STATE.displayWs?.readyState === WebSocket.OPEN) {
                STATE.displayWs.send(JSON.stringify({ command: 'setBrightness', brightness }));
            }
        }

        let lastHeartbeat = 0;
        function sendHeartbeat() {
            const now = Date.now();
            if (now - lastHeartbeat < 30000) return;
            lastHeartbeat = now;
            apiCall('/api/v1/machine/heartbeat', { method: 'POST' });
        }

        // Idle dimming — dim after inactivity on main/done screens
        let idleTimer = null;
        const IDLE_DIM_MS = 60000;

        function resetIdleTimer() {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                if (STATE.screen === 'main' || STATE.screen === 'done') {
                    setDisplayBrightness(5);
                }
            }, IDLE_DIM_MS);
        }

        function onUserActivity() {
            if (STATE.screen !== 'sleep') {
                setDisplayBrightness(100);
            }
            resetIdleTimer();
            sendHeartbeat();
        }

        // ============ STATE MACHINE ============

        // ============ UI HANDLERS ============
        async function openCarousel() {
            STATE.screen = 'carousel';
            STATE.carouselStep = 0;
            STATE.scaleConnected = false;
            STATE.targetWeightReached = false;
            render();
            
            // Start connecting scale immediately
            await connectScale();
            renderCarouselOnly();
        }

        function closeCarousel() {
            cancelGhcHint();
            STATE.screen = 'main';
            STATE.carouselStep = 0;
            disconnectScaleWebSocket();
            disconnectDevicesWebSocket();
            render();
        }

        function cancelGhcHint() {
            clearTimeout(STATE.ghcHintTimer);
            STATE.ghcHintTimer = null;
            STATE.showGhcHint = false;
        }

        async function ghcStartOver() {
            cancelGhcHint();
            await apiCall('/api/v1/machine/state/idle', { method: 'PUT' });
            STATE.carouselStep = 6;
            renderCarouselOnly();
        }

        async function nextStep() {
            if (STATE.carouselStep === 6) {
                // Last step - start brewing
                await startBrewing();

                // If GHC present, show hint after 8s if not yet brewing
                if (STATE.machineInfo?.GHC) {
                    STATE.showGhcHint = false;
                    STATE.ghcHintTimer = setTimeout(() => {
                        if (STATE.screen === 'carousel') {
                            STATE.showGhcHint = true;
                            renderCarouselOnly();
                        }
                    }, 8000);
                }
                return;
            }
            if (STATE.carouselStep < 6) {
                // Start weight monitoring when entering step 1 (Weigh Coffee)
                if (STATE.carouselStep === 0 && STATE.scaleConnected) {
                    connectScaleWebSocket();
                }

                // Disconnect from scale after step 1
                if (STATE.carouselStep === 1) {
                    disconnectScaleWebSocket();
                }

                STATE.carouselStep++;
                renderCarouselOnly();
            }
        }

        function prevStep() {
            if (STATE.carouselStep > 0) {
                // Reconnect to scale when going back to step 1
                if (STATE.carouselStep === 2) {
                    connectScaleWebSocket();
                }
                
                // Disconnect when going back from step 1
                if (STATE.carouselStep === 1) {
                    disconnectScaleWebSocket();
                }
                
                STATE.carouselStep--;
                renderCarouselOnly();
            }
        }

        function updateWeightDisplay() {
            const weightText = document.querySelector('.weight-display');
            if (weightText) {
                weightText.textContent = \`Current: \${STATE.currentWeight.toFixed(1)}g / Target: \${CONFIG.coffeeWeight}g\`;
                weightText.style.color = STATE.targetWeightReached ? 'var(--status-ready)' : '';
            }
        }

        function renderCarouselOnly() {
            const carousel = document.querySelector('.carousel-container');
            if (carousel) {
                const steps = [
                    {
                        title: 'Turn On Scale',
                        description: STATE.scaleConnected
                            ? '✓ Scale connected'
                            : 'Looking for your scale...',
                        hasInput: false
                    },
                    {
                        title: 'Weigh Coffee',
                        description: \`Place \${CONFIG.coffeeWeight}g of beans on the scale.\`,
                        hasInput: false,
                        showWeight: true
                    },
                    { title: 'Set Grinder', description: \`Dial your grinder to \${CONFIG.grinderSetting}.\`, hasInput: false },
                    { title: 'Grind', description: 'Grind until all beans are processed.', hasInput: false },
                    { title: 'Tamp', description: 'Fill the portafilter and tamp evenly.', hasInput: false },
                    { title: 'Lock In', description: 'Insert the portafilter into the group head.', hasInput: false },
                    { title: 'Place Cup', description: 'Position your cup under the group head.', hasInput: false }
                ];

                const step = steps[STATE.carouselStep];
                const progress = Array.from({ length: 7 }, (_, i) => \`<div class="progress-dot \${i === STATE.carouselStep ? 'active' : ''}" aria-hidden="true"></div>\`).join('');

                const weightDisplay = step.showWeight
                    ? \`<p class="weight-display" aria-live="polite">\${STATE.currentWeight.toFixed(1)}g / \${CONFIG.coffeeWeight}g</p>
                       <button class="tare-btn" onclick="tareScale()" \${!STATE.scaleConnected ? 'disabled' : ''}>Tare Scale</button>\`
                    : '';

                carousel.innerHTML = \`
                    <div class="carousel-progress">
                        \${progress}
                        <span class="sr-only">Step \${STATE.carouselStep + 1} of 7</span>
                    </div>
                    <div class="carousel-step" aria-live="polite">
                        <h2>\${step.title}</h2>
                        <p style="color: \${STATE.carouselStep === 0 && STATE.scaleConnected ? 'var(--status-ready)' : 'inherit'}">\${step.description}</p>
                        \${weightDisplay}
                        \${STATE.showGhcHint ? '<p style="color: var(--status-warming); margin-top: 1rem;">Press the glowing white area on the group head to start your shot. The machine is ready and waiting for your touch.</p>' : ''}
                    </div>
                    <div class="carousel-controls">
                        \${STATE.showGhcHint
                            ? '<button class="carousel-btn prev" onclick="ghcStartOver()">Start Over</button>'
                            : \`<button class="carousel-btn prev" onclick="prevStep()" \${STATE.carouselStep === 0 ? 'disabled' : ''}>← Back</button>\`}
                        <button class="carousel-btn next" onclick="nextStep()">\${STATE.carouselStep === 6 ? 'Brew ☕' : 'Next →'}</button>
                    </div>
                \`;
            }
        }

        async function openSettings() {
            STATE.screen = 'settings';
            await Promise.all([getMachineInfo(), getBuildInfo()]);
            render();
        }

        function closeSettings() {
            STATE.screen = 'main';
            render();
        }

        function openPluginSettings() {
            const pluginUrl = \`\${CONFIG.apiUrl}/api/v1/plugins/settings.reaplugin/ui?backName=Baseline\`;
            window.open(pluginUrl, '_blank');
        }

        function openMachineSettings() {
            STATE.screen = 'machineSettings';
            render();
        }

        function closeMachineSettings() {
            STATE.screen = 'settings';
            render();
        }

        async function saveMachineSettingsFromDialog() {
            CONFIG.steam = {
                targetTemperature: parseInt(document.getElementById('steamTemp').value),
                duration: parseInt(document.getElementById('steamDuration').value),
                flow: parseFloat(document.getElementById('steamFlow').value)
            };
            CONFIG.hotWater = {
                targetTemperature: parseInt(document.getElementById('hwTemp').value),
                duration: parseInt(document.getElementById('hwDuration').value),
                volume: parseInt(document.getElementById('hwVolume').value),
                flow: parseFloat(document.getElementById('hwFlow').value)
            };
            CONFIG.rinse = {
                targetTemperature: parseInt(document.getElementById('rinseTemp').value),
                duration: parseInt(document.getElementById('rinseDuration').value),
                flow: parseFloat(document.getElementById('rinseFlow').value)
            };

            saveWorkflowToKv();
            await pushWorkflowToMachine();
            closeMachineSettings();
        }

        async function saveSettingsFromDialog() {
            CONFIG.apiUrl = document.getElementById('settingServerUrl').value;
            CONFIG.coffeeWeight = parseFloat(document.getElementById('settingCoffeeWeight').value);
            CONFIG.grinderSetting = parseFloat(document.getElementById('settingGrinder').value);
            CONFIG.profile = document.getElementById('settingProfile').value;
            CONFIG.clockFormat = document.getElementById('settingClockFormat').value;

            saveSettings();
            saveWorkflowToKv();
            await pushWorkflowToMachine();
            closeSettings();
        }

        function makeAnother() {
            STATE.screen = 'main';
            STATE.carouselStep = 0;
            STATE.brewingStartTime = null;
            render();
        }

        async function sleep() {
            setDisplayBrightness(5);
            STATE.screen = 'sleep';
            render();
        }

        async function sleepMachineAndTransition() {
            await sleepMachine();
            await sleep();
        }

        async function wakeUp() {
            STATE.screen = 'main';
            setDisplayBrightness(100);

            await wakeMachine();
            await pushWorkflowToMachine();

            render();
            resetIdleTimer();
        }

        // ============ RENDERING ============
        function getStatusDisplay() {
            const s = STATE.machineState;
            if (s === 'disconnected') return { class: 'disconnected', text: 'Not Connected', hint: 'Check that the machine is on' };
            if (s === 'error') return { class: 'disconnected', text: 'Machine Error', hint: 'Try restarting the machine' };
            if (s === 'needsWater') return { class: 'disconnected', text: 'Refill Water', hint: 'The water tank is empty' };
            if (s === 'idle') return { class: 'connected ready', text: 'Ready to Brew', hint: '' };
            if (s === 'sleeping') return { class: 'connected not-ready', text: 'Sleeping', hint: '' };
            if (s === 'heating' || s === 'preheating' || s === 'booting') return { class: 'connected not-ready', text: 'Warming Up', hint: 'Almost ready...' };
            if (s === 'espresso') return { class: 'connected ready', text: 'Brewing', hint: '' };
            if (s === 'steam') return { class: 'connected ready', text: 'Steaming', hint: '' };
            if (s === 'hotWater') return { class: 'connected ready', text: 'Hot Water', hint: '' };
            if (s === 'flush' || s === 'steamRinse') return { class: 'connected not-ready', text: 'Flushing', hint: '' };
            if (s === 'cleaning' || s === 'descaling') return { class: 'connected not-ready', text: 'Cleaning', hint: '' };
            return { class: 'connected not-ready', text: s, hint: '' };
        }

        function renderMainScreen() {
            const status = getStatusDisplay();
            return \`
                <main class="main-screen" aria-label="Espresso machine control">
                    <canvas id="ambientCanvas" aria-hidden="true"></canvas>
                    <button class="power-button" onclick="sleepMachineAndTransition()" aria-label="Sleep machine"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg></button>

                    <div class="status-area" aria-live="polite" aria-atomic="true">
                        <div class="status-indicator">
                            <div class="status-dot \${status.class}" aria-hidden="true"></div>
                            <span>\${status.text}</span>
                        </div>
                        \${status.hint ? \`<div class="status-text">\${status.hint}</div>\` : ''}
                        <div class="temperature-display" aria-label="Group temperature">\${STATE.currentTemperature > 0 ? STATE.currentTemperature.toFixed(1) + '\u00B0C' : ''}</div>
                        <div class="water-level-display" aria-label="Water level">\${STATE.waterLevelLiters.toFixed(1)}L</div>
                    </div>

                    <div class="center-content">
                        <button class="coffee-button" onclick="openCarousel()" \${!STATE.machineReady ? 'disabled aria-disabled="true"' : ''}>
                            ☕ Let's Make Coffee
                        </button>
                    </div>

                    <nav class="toolbar" aria-label="Controls">
                        <button class="toolbar-button" onclick="openPluginSettings()" aria-label="Plugin settings">🔌</button>
                        <button class="toolbar-button" onclick="openSettings()" aria-label="Settings">⚙️</button>
                    </nav>
                </main>
            \`;
        }

        function renderCarousel() {
            const steps = [
                {
                    title: 'Turn On Scale',
                    description: 'Make sure your scale is powered on.',
                    hasInput: false
                },
                {
                    title: 'Weigh Coffee',
                    description: \`Place \${CONFIG.coffeeWeight}g of beans on the scale.\`,
                    hasInput: false
                },
                {
                    title: 'Set Grinder',
                    description: \`Dial your grinder to \${CONFIG.grinderSetting}.\`,
                    hasInput: false
                },
                {
                    title: 'Grind',
                    description: 'Grind until all beans are processed.',
                    hasInput: false
                },
                {
                    title: 'Tamp',
                    description: 'Fill the portafilter and tamp evenly.',
                    hasInput: false
                },
                {
                    title: 'Lock In',
                    description: 'Insert the portafilter into the group head.',
                    hasInput: false
                },
                {
                    title: 'Place Cup',
                    description: 'Position your cup under the group head.',
                    hasInput: false
                }
            ];

            const step = steps[STATE.carouselStep];
            const progress = Array.from({ length: 7 }, (_, i) => \`<div class="progress-dot \${i === STATE.carouselStep ? 'active' : ''}" aria-hidden="true"></div>\`).join('');

            return \`
                <div class="carousel-overlay" onclick="event.target === this && closeCarousel()" role="dialog" aria-label="Brewing workflow" aria-modal="true">
                    <canvas id="carouselCanvas" aria-hidden="true"></canvas>
                    <div class="carousel-container">
                        <div class="carousel-progress">
                            \${progress}
                            <span class="sr-only">Step \${STATE.carouselStep + 1} of 7</span>
                        </div>
                        <div class="carousel-step" aria-live="polite">
                            <h2>\${step.title}</h2>
                            <p>\${step.description}</p>
                        </div>
                        <div class="carousel-controls">
                            <button class="carousel-btn prev" onclick="prevStep()" \${STATE.carouselStep === 0 ? 'disabled' : ''}>← Back</button>
                            <button class="carousel-btn next" onclick="nextStep()">\${STATE.carouselStep === 6 ? 'Brew ☕' : 'Next →'}</button>
                        </div>
                    </div>
                </div>
            \`;
        }

        function renderBrewingScreen() {
            const elapsed = Math.floor((Date.now() - (STATE.brewingStartTime || Date.now())) / 1000);
            return \`
                <div class="brewing-container" role="status" aria-label="Brewing in progress">
                    <canvas id="brewingCanvas" width="400" height="400" aria-hidden="true"></canvas>
                    <div class="brewing-info" aria-live="polite">
                        <div class="brewing-stat">
                            <div class="brewing-stat-value" aria-label="Pressure">\${STATE.currentPressure.toFixed(1)}</div>
                            <div class="brewing-stat-label" aria-hidden="true">Bar</div>
                        </div>
                        <div class="brewing-stat">
                            <div class="brewing-stat-value" aria-label="Flow rate">\${STATE.currentFlow.toFixed(1)}</div>
                            <div class="brewing-stat-label" aria-hidden="true">ml/s</div>
                        </div>
                        <div class="brewing-stat">
                            <div class="brewing-stat-value" aria-label="Elapsed time">\${elapsed}</div>
                            <div class="brewing-stat-label" aria-hidden="true">Sec</div>
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
                <div class="sleep-screen" onclick="wakeUp()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();wakeUp();}" role="button" tabindex="0" aria-label="Machine sleeping. Tap or press any key to wake.">
                    <canvas id="sleepCanvas" width="800" height="800" aria-hidden="true"></canvas>
                    <div class="sleep-content">
                        <div class="sleep-clock" aria-live="off" aria-label="Current time">\${timeString}</div>
                        <div class="sleep-status">Tap to wake</div>
                    </div>
                </div>
            \`;
        }

        function renderDoneScreen() {
            return \`
                <main class="main-screen" aria-label="Brewing complete">
                    <canvas id="ambientCanvas" aria-hidden="true"></canvas>
                    <div class="center-content">
                        <h1 class="done-title">☕ Enjoy!</h1>
                        <p class="done-subtitle">Your espresso is ready.</p>
                        <div class="action-buttons">
                            <button class="action-btn again" onclick="makeAnother()">One More</button>
                            <button class="action-btn sleep" onclick="sleep()">Done</button>
                        </div>
                    </div>
                </main>
            \`;
        }

        function renderSettingsScreen() {
            const profileOptions = STATE.profiles.map(p =>
                \`<option value="\${p.id}" \${p.id === CONFIG.profile ? 'selected' : ''}>\${p.profile.title || p.id}</option>\`
            ).join('');

            return \`
                <div class="settings-overlay" role="dialog" aria-label="Settings" aria-modal="true">
                    <div class="settings-dialog">
                        <h2 class="settings-title">Settings</h2>

                        <div class="setting-group">
                            <label class="setting-label" for="settingProfile">Brewing Profile</label>
                            <select id="settingProfile" class="setting-input">
                                \${profileOptions.length ? '' : '<option value="">No profiles found</option>'}
                                \${profileOptions}
                            </select>
                        </div>

                        <div class="setting-group">
                            <label class="setting-label" for="settingCoffeeWeight">Dose (grams)</label>
                            <input type="number" id="settingCoffeeWeight" class="setting-input" value="\${CONFIG.coffeeWeight}" min="1" max="50" />
                        </div>

                        <div class="setting-group">
                            <label class="setting-label" for="settingGrinder">Grinder Setting</label>
                            <input type="number" id="settingGrinder" class="setting-input" value="\${CONFIG.grinderSetting}" min="1" />
                        </div>

                        <div class="setting-group setting-group-divider">
                            <label class="setting-label" for="settingClockFormat">Clock</label>
                            <select id="settingClockFormat" class="setting-input">
                                <option value="24" \${CONFIG.clockFormat === '24' ? 'selected' : ''}>24-hour</option>
                                <option value="12" \${CONFIG.clockFormat === '12' ? 'selected' : ''}>12-hour</option>
                            </select>
                        </div>

                        <div class="setting-group">
                            <label class="setting-label" for="settingServerUrl">Bridge Address</label>
                            <input type="text" id="settingServerUrl" class="setting-input" value="\${CONFIG.apiUrl}" placeholder="http://192.168.1.x:8080" />
                        </div>

                        \${STATE.machineInfo || STATE.buildInfo ? \`
                        <div class="setting-group setting-group-divider">
                            <label class="setting-label">Machine Info</label>
                            <div class="machine-info-text">
                                \${STATE.machineInfo?.model ? 'Model: ' + STATE.machineInfo.model + '<br>' : ''}
                                \${STATE.machineInfo?.serialNumber ? 'Serial: ' + STATE.machineInfo.serialNumber + '<br>' : ''}
                                \${STATE.machineInfo?.version ? 'Firmware: ' + STATE.machineInfo.version + '<br>' : ''}
                                \${STATE.buildInfo?.fullVersion ? 'Bridge: ' + STATE.buildInfo.fullVersion : (STATE.buildInfo?.version ? 'Bridge: ' + STATE.buildInfo.version : '')}
                            </div>
                        </div>
                        \` : ''}

                        <div class="setting-group">
                            <button class="machine-settings-btn" onclick="openMachineSettings()">\u2699 Machine Settings \u2192</button>
                        </div>

                        <div class="settings-buttons">
                            <button class="settings-button cancel" onclick="closeSettings()">Cancel</button>
                            <button class="settings-button save" onclick="saveSettingsFromDialog()">Save</button>
                        </div>
                    </div>
                </div>
            \`;
        }

        function renderMachineSettingsScreen() {
            return \`
                <div class="machine-settings-screen" role="dialog" aria-label="Machine Settings" aria-modal="true">
                    <div class="machine-settings-container">
                        <button class="machine-settings-back" onclick="closeMachineSettings()">\u2190 Machine Settings</button>

                        <div class="machine-settings-section">
                            <h3 class="machine-settings-section-title">Steam</h3>
                            <div class="setting-group">
                                <label class="setting-label" for="steamTemp">Temperature (\u00B0C)</label>
                                <input type="number" id="steamTemp" class="setting-input" value="\${CONFIG.steam.targetTemperature}" min="100" max="165" />
                            </div>
                            <div class="setting-group">
                                <label class="setting-label" for="steamDuration">Duration (sec)</label>
                                <input type="number" id="steamDuration" class="setting-input" value="\${CONFIG.steam.duration}" min="1" max="120" />
                            </div>
                            <div class="setting-group">
                                <label class="setting-label" for="steamFlow">Flow Rate</label>
                                <input type="number" id="steamFlow" class="setting-input" value="\${CONFIG.steam.flow}" min="0" max="4" step="0.1" />
                            </div>
                        </div>

                        <div class="machine-settings-section">
                            <h3 class="machine-settings-section-title">Hot Water</h3>
                            <div class="setting-group">
                                <label class="setting-label" for="hwTemp">Temperature (\u00B0C)</label>
                                <input type="number" id="hwTemp" class="setting-input" value="\${CONFIG.hotWater.targetTemperature}" min="40" max="100" />
                            </div>
                            <div class="setting-group">
                                <label class="setting-label" for="hwDuration">Duration (sec)</label>
                                <input type="number" id="hwDuration" class="setting-input" value="\${CONFIG.hotWater.duration}" min="1" max="120" />
                            </div>
                            <div class="setting-group">
                                <label class="setting-label" for="hwVolume">Volume (ml)</label>
                                <input type="number" id="hwVolume" class="setting-input" value="\${CONFIG.hotWater.volume}" min="10" max="500" />
                            </div>
                            <div class="setting-group">
                                <label class="setting-label" for="hwFlow">Flow Rate</label>
                                <input type="number" id="hwFlow" class="setting-input" value="\${CONFIG.hotWater.flow}" min="0" max="15" step="0.1" />
                            </div>
                        </div>

                        <div class="machine-settings-section">
                            <h3 class="machine-settings-section-title">Rinse</h3>
                            <div class="setting-group">
                                <label class="setting-label" for="rinseTemp">Temperature (\u00B0C)</label>
                                <input type="number" id="rinseTemp" class="setting-input" value="\${CONFIG.rinse.targetTemperature}" min="40" max="100" />
                            </div>
                            <div class="setting-group">
                                <label class="setting-label" for="rinseDuration">Duration (sec)</label>
                                <input type="number" id="rinseDuration" class="setting-input" value="\${CONFIG.rinse.duration}" min="1" max="60" />
                            </div>
                            <div class="setting-group">
                                <label class="setting-label" for="rinseFlow">Flow Rate</label>
                                <input type="number" id="rinseFlow" class="setting-input" value="\${CONFIG.rinse.flow}" min="0" max="10" step="0.1" />
                            </div>
                        </div>

                        <div class="settings-buttons">
                            <button class="settings-button save" onclick="saveMachineSettingsFromDialog()">Save</button>
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
            } else if (STATE.screen === 'settings') {
                app.innerHTML = renderMainScreen() + renderSettingsScreen();
                setTimeout(() => renderAmbientAnimation('ambientCanvas'), 50);
            } else if (STATE.screen === 'machineSettings') {
                app.innerHTML = renderMachineSettingsScreen();
            }

            if (STATE.screen === 'brewing' && !brewingAnimationFrame) {
                setTimeout(renderBrewingVisualization, 50);
            }
        }

        // ============ CANVAS VISUALIZATIONS ============
        // Brewing animation — same style as sleep, with particle speed
        // driven by flow (blue particles) and pressure (green particles)
        let brewingParticles = null;
        let smoothedPressure = 0;
        let smoothedFlow = 0;
        let brewingAnimationFrame = null;

        function initBrewingParticles() {
            const count = 40;
            brewingParticles = Array.from({ length: count }, (_, i) => {
                // First half: blue/flow particles, second half: green/pressure particles
                const isFlow = i < count / 2;
                return {
                    isFlow,
                    offsetX: Math.random() * 400 - 200,
                    offsetY: Math.random() * 400 - 200,
                    baseSpeedX: 0.1 + Math.random() * 0.3,
                    baseSpeedY: 0.15 + Math.random() * 0.25,
                    phaseX: Math.random() * Math.PI * 2,
                    phaseY: Math.random() * Math.PI * 2,
                    baseSize: 20 + Math.random() * 60,
                    pulseSpeed: 0.2 + Math.random() * 0.4,
                    pulsePhase: Math.random() * Math.PI * 2,
                    pulseAmount: 0.3 + Math.random() * 0.5,
                    hue: isFlow
                        ? (i % 3 === 0 ? 210 : (i % 3 === 1 ? 200 : 220))  // blue range
                        : (i % 3 === 0 ? 140 : (i % 3 === 1 ? 150 : 160)), // green range
                    saturation: 50 + Math.random() * 30,
                    baseOpacity: 0.05 + Math.random() * 0.12,
                    opacitySpeed: 0.15 + Math.random() * 0.25,
                    opacityPhase: Math.random() * Math.PI * 2,
                    trailLength: 3 + Math.floor(Math.random() * 5),
                    trail: []
                };
            });
        }

        function renderBrewingVisualization() {
            const canvas = document.getElementById('brewingCanvas');
            if (!canvas || reducedMotionEnabled()) {
                brewingAnimationFrame = null;
                return;
            }

            if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            if (!brewingParticles) initBrewingParticles();

            const ctx = canvas.getContext('2d');
            const time = Date.now() / 1000;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Fade effect for trails
            ctx.fillStyle = 'rgba(10, 14, 39, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Smooth data values
            const smoothingFactor = 0.05;
            smoothedPressure += (STATE.currentPressure - smoothedPressure) * smoothingFactor;
            smoothedFlow += (STATE.currentFlow - smoothedFlow) * smoothingFactor;

            // Speed multipliers: base 1x at 0, up to ~4x at high values
            const flowSpeed = 1 + smoothedFlow * 0.5;
            const pressureSpeed = 1 + smoothedPressure * 0.3;

            // Draw connection lines between nearby particles
            ctx.lineWidth = 1;
            for (let i = 0; i < brewingParticles.length; i++) {
                for (let j = i + 1; j < brewingParticles.length; j++) {
                    const p1 = brewingParticles[i];
                    const p2 = brewingParticles[j];
                    const s1 = p1.isFlow ? flowSpeed : pressureSpeed;
                    const s2 = p2.isFlow ? flowSpeed : pressureSpeed;

                    const x1 = centerX + p1.offsetX + Math.sin(time * p1.baseSpeedX * s1 + p1.phaseX) * 180;
                    const y1 = centerY + p1.offsetY + Math.cos(time * p1.baseSpeedY * s1 + p1.phaseY) * 180;
                    const x2 = centerX + p2.offsetX + Math.sin(time * p2.baseSpeedX * s2 + p2.phaseX) * 180;
                    const y2 = centerY + p2.offsetY + Math.cos(time * p2.baseSpeedY * s2 + p2.phaseY) * 180;

                    const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

                    if (dist < 150) {
                        const opacity = 0.3 * (1 - dist / 150);
                        const lineHue = (p1.isFlow && p2.isFlow) ? 210 : ((!p1.isFlow && !p2.isFlow) ? 150 : 180);
                        ctx.strokeStyle = \`hsla(\${lineHue}, 60%, 50%, \${opacity * 0.15})\`;
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();
                    }
                }
            }

            // Draw each particle with trails
            brewingParticles.forEach((p, i) => {
                const speed = p.isFlow ? flowSpeed : pressureSpeed;
                const x = centerX + p.offsetX + Math.sin(time * p.baseSpeedX * speed + p.phaseX) * 180;
                const y = centerY + p.offsetY + Math.cos(time * p.baseSpeedY * speed + p.phaseY) * 180;

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

                // Dynamic properties
                const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * p.pulseAmount;
                const size = p.baseSize * (1 + pulse);
                const opacityWave = Math.sin(time * p.opacitySpeed + p.opacityPhase) * 0.5 + 0.5;
                const opacity = p.baseOpacity * opacityWave;

                // Main particle with gradient
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
                gradient.addColorStop(0, \`hsla(\${p.hue}, \${p.saturation}%, 70%, \${opacity})\`);
                gradient.addColorStop(0.5, \`hsla(\${p.hue}, \${p.saturation}%, 60%, \${opacity * 0.5})\`);
                gradient.addColorStop(1, \`hsla(\${p.hue}, \${p.saturation}%, 50%, 0)\`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();

                // Occasional sparkle
                if (Math.sin(time * 2 + i) > 0.95) {
                    ctx.fillStyle = \`rgba(255, 255, 255, \${0.3 + Math.random() * 0.3})\`;
                    ctx.beginPath();
                    ctx.arc(x, y, 2 + Math.random() * 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // Breathing overlay
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

            brewingAnimationFrame = requestAnimationFrame(renderBrewingVisualization);
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
            if (!canvas || reducedMotionEnabled()) {
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
            if (!canvas || reducedMotionEnabled()) return;

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

        // ============ REDUCED MOTION ============
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        function reducedMotionEnabled() {
            return prefersReducedMotion.matches;
        }

        // ============ KEYBOARD HANDLERS ============
        function handleGlobalKeydown(e) {
            if (e.key === 'Escape') {
                if (STATE.screen === 'machineSettings') {
                    closeMachineSettings();
                } else if (STATE.screen === 'settings') {
                    closeSettings();
                } else if (STATE.screen === 'carousel') {
                    closeCarousel();
                }
            }
        }

        // ============ INITIALIZATION ============
        async function init() {
            console.log('[v0] Baseline starting...');
            connectMachineSnapshotWebSocket();
            connectWaterLevelWebSocket();
            connectDisplayWebSocket();

            document.addEventListener('keydown', handleGlobalKeydown);
            document.addEventListener('click', onUserActivity);
            document.addEventListener('touchstart', onUserActivity);

            await Promise.all([getMachineState(), getMachineInfo()]);
            await getProfiles();
            await loadSettingsFromKvStore();
            await pushWorkflowToMachine();

            render();
            resetIdleTimer();

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





























































