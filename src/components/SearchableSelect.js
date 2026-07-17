import React, { useEffect, useMemo, useRef, useState } from 'react';

const SearchableSelect = ({ options, value, onChange, placeholder, isOpen, onToggle, onClose }) => {
  const [query, setQuery] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!isOpen) { setQuery(''); return; }
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div ref={wrapperRef} className="relative">
      <button type="button" onClick={onToggle} className="w-full p-2.5 sm:p-3 border-2 border-burdan-gray rounded-xl focus:border-burdan-orange focus:outline-none font-body text-burdan-darkgray bg-white text-sm text-left flex items-center justify-between transition-all duration-200 hover:border-burdan-orange/50">
        <span className="truncate">{selectedOption ? selectedOption.label : <span className="text-burdan-darkgray/40">{placeholder}</span>}</span>
        <svg className={`w-4 h-4 text-burdan-darkgray/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-1 left-0 w-full z-[200] border border-burdan-gray rounded-xl bg-white shadow-xl overflow-hidden">
          <div className="flex items-center px-3 py-2.5 border-b border-burdan-gray/40">
            <svg className="w-4 h-4 mr-2 text-burdan-darkgray/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
            </svg>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} autoFocus placeholder={`Search ${placeholder}...`} className="w-full bg-transparent outline-none border-0 font-body text-burdan-darkgray text-sm" />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? filteredOptions.map((option) => (
              <button key={option.value} type="button" onClick={() => { onChange(option.value); onClose(); }}
                className={`w-full text-left px-3 py-2.5 font-body text-sm transition-colors duration-150 ${
                  option.value === value ? 'bg-burdan-red/10 text-burdan-red font-semibold' : 'text-burdan-darkgray hover:bg-burdan-gray'
                }`}>{option.label}</button>
            )) : (
              <div className="px-3 py-3 font-body text-sm text-burdan-darkgray/50">No stops found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
