import React, { useState } from 'react';
import { X, Server, CheckCircle2, AlertCircle, RefreshCw, Wifi } from 'lucide-react';
import { getApiBaseUrl, setApiBaseUrl, api } from '../services/api';

export default function ServerSettingsModal({ isOpen, onClose, onServerSaved }) {
  const [url, setUrl] = useState(() => getApiBaseUrl());
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handleTest = async () => {
    try {
      setTesting(true);
      setTestResult(null);
      const res = await api.checkHealth(url);
      setTestResult({
        ok: true,
        message: `Connected successfully! Database: ${res.database || 'online'}`
      });
    } catch (err) {
      setTestResult({
        ok: false,
        message: `Connection failed: ${err.message || 'Server unreachable'}. Verify your phone and computer are on the same Wi-Fi.`
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    const saved = setApiBaseUrl(url);
    if (onServerSaved) onServerSaved(saved);
    onClose();
  };

  const handleResetDefault = () => {
    const defaultUrl = 'http://192.168.1.5:5000/api';
    setUrl(defaultUrl);
    setTestResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-800/80 border border-teal-700 flex items-center justify-center text-teal-300">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Backend Server URL</h3>
              <p className="text-[11px] text-teal-300">Configure API endpoint for mobile & app</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-800 flex items-start gap-2">
            <Wifi className="w-4 h-4 shrink-0 mt-0.5 text-teal-700" />
            <span>
              Your phone must be connected to the same Wi-Fi network as your computer, or you can enter a public tunnel URL.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              API Base URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="http://192.168.1.5:5000/api"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:border-teal-600 focus:outline-hidden focus:ring-2 focus:ring-teal-100"
            />
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 text-[11px]">Quick presets:</span>
            <button
              type="button"
              onClick={handleResetDefault}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition"
            >
              192.168.1.5:5000 (Current PC)
            </button>
          </div>

          {/* Test Status feedback */}
          {testResult && (
            <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
              testResult.ok 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}>
              {testResult.ok ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              )}
              <span className="leading-relaxed">{testResult.message}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={handleTest}
              disabled={testing}
              className="w-1/2 py-2.5 rounded-xl border border-teal-700 text-teal-800 font-semibold text-xs hover:bg-teal-50 disabled:opacity-50 transition flex items-center justify-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Testing...' : 'Test Connection'}</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="w-1/2 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition shadow-xs"
            >
              Save & Apply
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
