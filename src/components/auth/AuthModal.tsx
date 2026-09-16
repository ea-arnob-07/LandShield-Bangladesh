import React, { useState } from 'react';
import { UserProfile, Language } from '../../types';
import { getRoleConfig } from '../../config/roleConfig';
import {
  X,
  LogIn,
  UserPlus,
  CheckCircle2,
  Landmark,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableUsers: UserProfile[];
  onSelectUser: (user: UserProfile) => void;
  language: Language;
  initialMode?: 'LOGIN' | 'REGISTER';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  availableUsers,
  onSelectUser,
  language,
  initialMode = 'LOGIN'
}) => {
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>(initialMode);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<'ALL' | 'CITIZEN' | 'OFFICER'>('ALL');
  
  // Form states
  const [demoUserInput, setDemoUserInput] = useState('');
  const [regName, setRegName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Look up a sample profile by its visible demo ID or sample email.
  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!demoUserInput.trim()) {
      setErrorMsg(language === 'bn' ? 'একটি ডেমো আইডি লিখুন' : 'Enter a demo ID');
      return;
    }

    const found = availableUsers.find(
      u => u.id.toLowerCase() === demoUserInput.trim().toLowerCase() || u.email.toLowerCase() === demoUserInput.trim().toLowerCase()
    );

    if (found) {
      onSelectUser(found);
      onClose();
    } else {
      setErrorMsg(language === 'bn' ? 'নমুনা প্রোফাইল পাওয়া যায়নি। উপরের তালিকা থেকে একটি ভূমিকা বেছে নিন।' : 'Sample profile not found. Choose a role from the list above.');
    }
  };

  // Create an in-memory demo profile. No identity or credential data is collected.
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) {
      setErrorMsg(language === 'bn' ? 'একটি ডাকনাম লিখুন' : 'Enter a display name');
      return;
    }

    const demoId = `demo-${Date.now()}`;
    const newCitizen: UserProfile = {
      id: demoId,
      nid: demoId,
      name: regName.trim(),
      nameBn: regName.trim(),
      role: 'CITIZEN',
      email: `${demoId}@example.invalid`,
      phone: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      designation: 'Demo Citizen',
      designationBn: 'ডেমো নাগরিক',
      jurisdiction: 'Sample Area',
      jurisdictionBn: 'নমুনা এলাকা',
      isNidVerified: false,
      isBiometricVerified: false
    };

    setSuccessMsg(language === 'bn' ? 'ডেমো প্রোফাইল তৈরি হয়েছে। এটি এই সেশনের জন্য।' : 'Demo profile created for this session.');
    setTimeout(() => {
      onSelectUser(newCitizen);
      onClose();
    }, 900);
  };

  const filteredUsers = availableUsers.filter(u => {
    if (selectedRoleFilter === 'ALL') return true;
    if (selectedRoleFilter === 'CITIZEN') {
      return ['CITIZEN', 'OWNER', 'BUYER_SELLER'].includes(u.role);
    }
    if (selectedRoleFilter === 'OFFICER') {
      return !['CITIZEN', 'OWNER', 'BUYER_SELLER'].includes(u.role);
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800 flex items-center justify-center text-white border border-emerald-600/50 shadow-md">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                {language === 'bn' ? 'LandTech ডেমো প্রোফাইল' : 'LandTech Demo Profiles'}
              </h3>
              <p className="text-[11px] text-emerald-300">
                {language === 'bn' ? '১০টি নমুনা ভূমিকার ড্যাশবোর্ড ঘুরে দেখুন' : 'Explore 10 sample role dashboards'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Login vs Register */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 pt-3">
          <button
            onClick={() => { setAuthMode('LOGIN'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
              authMode === 'LOGIN'
                ? 'border-emerald-800 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>{language === 'bn' ? 'ডেমোতে প্রবেশ' : 'Explore Demo'}</span>
          </button>

          <button
            onClick={() => { setAuthMode('REGISTER'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
              authMode === 'REGISTER'
                ? 'border-emerald-800 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>{language === 'bn' ? 'ডেমো প্রোফাইল তৈরি' : 'Create Demo Profile'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {authMode === 'LOGIN' ? (
            <div className="space-y-6">
              {/* 1-Click Role Login Section (Demo Feature for evaluating 10 roles) */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-emerald-200/60">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-slate-900">
                      {language === 'bn' ? '১-ক্লিক ডেমো ভূমিকা লগইন (১০টি ভূমিকা)' : 'Instant 1-Click Demo Role Login (10 Roles)'}
                    </span>
                  </div>

                  {/* Role filter buttons */}
                  <div className="flex items-center gap-1 text-[10px]">
                    <button
                      onClick={() => setSelectedRoleFilter('ALL')}
                      className={`px-2 py-0.5 rounded-md font-bold cursor-pointer ${
                        selectedRoleFilter === 'ALL' ? 'bg-emerald-800 text-white' : 'bg-white text-slate-600'
                      }`}
                    >
                      {language === 'bn' ? 'সব (১০)' : 'All (10)'}
                    </button>
                    <button
                      onClick={() => setSelectedRoleFilter('CITIZEN')}
                      className={`px-2 py-0.5 rounded-md font-bold cursor-pointer ${
                        selectedRoleFilter === 'CITIZEN' ? 'bg-emerald-800 text-white' : 'bg-white text-slate-600'
                      }`}
                    >
                      {language === 'bn' ? 'নাগরিক/মালিক' : 'Citizen'}
                    </button>
                    <button
                      onClick={() => setSelectedRoleFilter('OFFICER')}
                      className={`px-2 py-0.5 rounded-md font-bold cursor-pointer ${
                        selectedRoleFilter === 'OFFICER' ? 'bg-emerald-800 text-white' : 'bg-white text-slate-600'
                      }`}
                    >
                      {language === 'bn' ? 'কর্মকর্তা' : 'Officers'}
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600">
                  {language === 'bn'
                    ? 'যেকোনো ভূমিকার প্রোফাইল নির্বাচন করে সরাসরি সেই ভূমিকার ড্যাশবোর্ড ও মেনু পরীক্ষা করুন:'
                    : 'Click any role below to evaluate that specific role dashboard and permission set:'}
                </p>

                {/* 10 Role Buttons Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {filteredUsers.map(user => {
                    const rConfig = getRoleConfig(user.role);
                    return (
                      <button
                        key={user.id}
                        onClick={() => {
                          onSelectUser(user);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-100/70 border border-slate-200 hover:border-emerald-400 transition-all flex items-center gap-2.5 group cursor-pointer"
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-xl object-cover border border-emerald-600 flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-950 truncate">
                              {language === 'bn' ? user.nameBn : user.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`text-[9px] font-black px-1.5 py-0.2 rounded ${rConfig.badgeBg} ${rConfig.badgeText} truncate`}>
                              {language === 'bn' ? rConfig.nameBn : rConfig.nameEn}
                            </span>
                            <span className="text-[9px] text-slate-400 truncate">
                              {user.jurisdictionBn || user.jurisdiction}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-800 flex-shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional lookup of a sample profile; no credentials are accepted. */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-[11px] text-slate-400 font-medium">
                    {language === 'bn' ? 'অথবা নমুনা প্রোফাইল খুঁজুন' : 'Or find a sample profile'}
                  </span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                <form onSubmit={handleManualLogin} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      {language === 'bn' ? 'নমুনা আইডি বা ডেমো ইমেইল' : 'Sample ID or demo email'}
                    </label>
                    <input
                      type="text"
                      value={demoUserInput}
                      onChange={(e) => setDemoUserInput(e.target.value)}
                      placeholder={language === 'bn' ? 'শুধু নমুনা আইডি লিখুন' : 'Use a sample profile ID only'}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">{language === 'bn' ? 'বাস্তব NID বা পাসওয়ার্ড লিখবেন না' : 'Do not enter real IDs or passwords'}</span>
                    <button
                      type="button"
                      onClick={() => setAuthMode('REGISTER')}
                      className="text-emerald-800 font-bold hover:underline cursor-pointer"
                    >
                      {language === 'bn' ? 'নিজের ডেমো প্রোফাইল' : 'Create demo profile'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{language === 'bn' ? 'নমুনা প্রোফাইল খুলুন' : 'Open sample profile'}</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* In-memory demo profile form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900">
                {language === 'bn' ? 'এটি কেবল ডিজাইন ডেমো। কোনো সরকারি অ্যাকাউন্ট, NID যাচাই বা স্থায়ী প্রোফাইল তৈরি হয় না। বাস্তব পরিচয় বা যোগাযোগের তথ্য দেবেন না।' : 'This is a design demo. It does not verify identities or create an official, permanent account. Do not enter personal details.'}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  {language === 'bn' ? 'ডাকনাম' : 'Display name'}
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: অতিথি' : 'e.g. Guest'}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>{language === 'bn' ? 'ডেমো প্রোফাইল খুলুন' : 'Open demo profile'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
