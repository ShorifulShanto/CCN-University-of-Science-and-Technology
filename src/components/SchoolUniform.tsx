import { useState, useEffect } from 'react';
import { UNIFORMS, UniformItem } from '../schoolData';
import { Shirt, Check, Sparkles, Sun, Snowflake } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function SchoolUniform() {
  const [activeSeason, setActiveSeason] = useState<'summer' | 'winter'>('summer');
  const [firestoreUniforms, setFirestoreUniforms] = useState<UniformItem[]>([]);

  useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db, 'uniforms'), (snapshot) => {
        if (!snapshot.empty) {
          const loaded: UniformItem[] = snapshot.docs.map(d => {
            const data = d.data();
            return {
              id: d.id,
              season: (data.season === 'winter' || data.season === 'summer') ? data.season : 'summer',
              gender: (data.gender === 'girl' || data.gender === 'boy') ? data.gender : 'boy',
              description: data.description || '',
              components: Array.isArray(data.components) ? data.components : [],
              imageUrl: data.imageUrl || ''
            };
          });
          setFirestoreUniforms(loaded);
        }
      }, (err) => {
        handleFirestoreError(err, OperationType.GET, 'uniforms');
      });
      return () => unsub();
    } catch (e) {
      console.warn('Uniforms Firestore subscription error:', e);
    }
  }, []);

  const allUniforms = firestoreUniforms.length > 0 ? firestoreUniforms : UNIFORMS;

  const boysUniform = allUniforms.find(u => u.season === activeSeason && u.gender === 'boy') || UNIFORMS.find(u => u.season === activeSeason && u.gender === 'boy');
  const girlsUniform = allUniforms.find(u => u.season === activeSeason && u.gender === 'girl') || UNIFORMS.find(u => u.season === activeSeason && u.gender === 'girl');

  return (
    <section id="uniform" className="py-24 bg-[#FAF8F5] relative overflow-hidden border-t border-[#D0E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#163A2D] font-bold bg-[#EAF2ED] border border-[#163A2D]/20 px-3.5 py-1.5 inline-block">
            Our Attire
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#163A2D] mt-3">
            Official School Uniform Specifications
          </h2>
          <p className="text-xs sm:text-sm text-[#4E7D68] mt-3 max-w-lg mx-auto font-sans leading-relaxed">
            Symmetric, high-quality uniform lines designed carefully to foster organizational pride, peer equality, and neat presentation.
          </p>
        </div>

        {/* 4 Options Structural Overview Map */}
        <div className="max-w-4xl mx-auto mb-10 bg-white p-6 border-2 border-[#163A2D] shadow-sm">
          <p className="text-center text-[10px] uppercase tracking-widest font-mono text-[#4E7D68] font-bold mb-4">
            Four Mandatory Attire Presets (Classes 6–10)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            
            <button
              onClick={() => setActiveSeason('summer')}
              className={`p-4 border transition-all text-left cursor-pointer ${
                activeSeason === 'summer'
                  ? 'bg-[#163A2D] border-[#163A2D] text-[#FAD02C] shadow-md'
                  : 'bg-[#FAF8F5] border-[#D0E4DA] text-[#4E7D68] hover:border-[#163A2D]'
              }`}
            >
              <span className={`block text-[8px] font-mono font-bold ${activeSeason === 'summer' ? 'text-[#FAD02C]' : 'text-[#163A2D]'}`}>OPTION 01 • WARM</span>
              <span className={`text-xs font-bold uppercase tracking-wider block mt-1 ${activeSeason === 'summer' ? 'text-white' : 'text-[#163A2D]'}`}>Summer Boys</span>
            </button>

            <button
              onClick={() => setActiveSeason('summer')}
              className={`p-4 border transition-all text-left cursor-pointer ${
                activeSeason === 'summer'
                  ? 'bg-[#163A2D] border-[#163A2D] text-[#FAD02C] shadow-md'
                  : 'bg-[#FAF8F5] border-[#D0E4DA] text-[#4E7D68] hover:border-[#163A2D]'
              }`}
            >
              <span className={`block text-[8px] font-mono font-bold ${activeSeason === 'summer' ? 'text-[#FAD02C]' : 'text-[#163A2D]'}`}>OPTION 02 • WARM</span>
              <span className={`text-xs font-bold uppercase tracking-wider block mt-1 ${activeSeason === 'summer' ? 'text-white' : 'text-[#163A2D]'}`}>Summer Girls</span>
            </button>

            <button
              onClick={() => setActiveSeason('winter')}
              className={`p-4 border transition-all text-left cursor-pointer ${
                activeSeason === 'winter'
                  ? 'bg-[#163A2D] border-[#163A2D] text-[#FAD02C] shadow-md'
                  : 'bg-[#FAF8F5] border-[#D0E4DA] text-[#4E7D68] hover:border-[#163A2D]'
              }`}
            >
              <span className={`block text-[8px] font-mono font-bold ${activeSeason === 'winter' ? 'text-[#FAD02C]' : 'text-[#163A2D]'}`}>OPTION 03 • COLD</span>
              <span className={`text-xs font-bold uppercase tracking-wider block mt-1 ${activeSeason === 'winter' ? 'text-white' : 'text-[#163A2D]'}`}>Winter Boys</span>
            </button>

            <button
              onClick={() => setActiveSeason('winter')}
              className={`p-4 border transition-all text-left cursor-pointer ${
                activeSeason === 'winter'
                  ? 'bg-[#163A2D] border-[#163A2D] text-[#FAD02C] shadow-md'
                  : 'bg-[#FAF8F5] border-[#D0E4DA] text-[#4E7D68] hover:border-[#163A2D]'
              }`}
            >
              <span className={`block text-[8px] font-mono font-bold ${activeSeason === 'winter' ? 'text-[#FAD02C]' : 'text-[#163A2D]'}`}>OPTION 04 • COLD</span>
              <span className={`text-xs font-bold uppercase tracking-wider block mt-1 ${activeSeason === 'winter' ? 'text-white' : 'text-[#163A2D]'}`}>Winter Girls</span>
            </button>

          </div>
        </div>

        {/* Season Selector Toggle */}
        <div className="flex justify-center mb-12">
          <div className="relative p-1 flex items-center bg-white shadow-sm border-2 border-[#163A2D] gap-2">
            
            {/* Summer Button */}
            <button
              onClick={() => setActiveSeason('summer')}
              className={`px-7 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors flex items-center space-x-2.5 cursor-pointer font-mono ${
                activeSeason === 'summer'
                  ? 'bg-[#163A2D] text-[#FAD02C]'
                  : 'text-[#4E7D68] hover:text-[#163A2D] hover:bg-[#FAF8F5]'
              }`}
            >
              <Sun className="w-4 h-4 text-[#FAD02C]" />
              <span>Summer Uniforms</span>
            </button>

            {/* Winter Button */}
            <button
              onClick={() => setActiveSeason('winter')}
              className={`px-7 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors flex items-center space-x-2.5 cursor-pointer font-mono ${
                activeSeason === 'winter'
                  ? 'bg-[#163A2D] text-[#FAD02C]'
                  : 'text-[#4E7D68] hover:text-[#163A2D] hover:bg-[#FAF8F5]'
              }`}
            >
              <Snowflake className="w-4 h-4 text-[#FAD02C]" />
              <span>Winter Uniforms</span>
            </button>

          </div>
        </div>

        {/* Side-by-Side Gender Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* BOYS UNIFORM CARD */}
          {boysUniform && (
            <div className="bg-white border-2 border-[#163A2D] shadow-sm flex flex-col justify-between group">
              <div>
                {/* Header Area */}
                <div className="p-6 border-b border-[#D0E4DA] flex items-center justify-between bg-[#FAF8F5]">
                  <div>
                    <span className="text-[9px] font-mono uppercase bg-[#EAF2ED] text-[#163A2D] px-2.5 py-1 font-bold border border-[#163A2D]/20">
                      {activeSeason === 'summer' ? 'Option 01 • Summer Boy' : 'Option 03 • Winter Boy'}
                    </span>
                    <h3 className="font-sans text-xl font-black text-[#163A2D] mt-2">
                      {activeSeason === 'summer' ? 'Summer Dress (Boys)' : 'Winter Dress (Boys)'}
                    </h3>
                  </div>
                  <div className="w-10 h-10 bg-[#163A2D] text-[#FAD02C] flex items-center justify-center">
                    <Shirt className="w-5 h-5" />
                  </div>
                </div>

                {/* Presentation Image */}
                <div className="relative h-[440px] sm:h-[540px] bg-[#FAF8F5] overflow-hidden border-b border-[#D0E4DA]">
                  <img
                    src={boysUniform.imageUrl}
                    alt="Boys Uniform Presentation Render"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-4 left-6 text-[#FAD02C] bg-[#163A2D] text-[9px] font-mono uppercase tracking-widest px-3 py-1 font-bold border border-[#FAD02C]/40">
                    {activeSeason === 'summer' ? 'Summer Uniform Specification' : 'Winter Uniform Specification'}
                  </span>
                </div>

                {/* Details Section */}
                <div className="p-6 sm:p-8 space-y-6">
                  <p className="text-[#4E7D68] text-xs sm:text-sm leading-relaxed font-sans">
                    {boysUniform.description}
                  </p>

                  {/* Components Spec */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase tracking-widest font-mono text-[#163A2D] font-bold">
                      Specification Details
                    </h4>
                    <div className="space-y-2">
                      {boysUniform.components.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 bg-[#FAF8F5] border border-[#D0E4DA] p-3">
                          <div className="mt-0.5 bg-[#163A2D] p-0.5 text-[#FAD02C] shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs text-[#163A2D] leading-relaxed font-sans font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#D0E4DA] flex items-center justify-between text-[9px] font-mono text-[#4E7D68] font-bold">
                <span>SPEC CODE: SHS-UNI-{activeSeason.toUpperCase()}-BOY</span>
                <span className="text-[#163A2D]">Mandatory Attire</span>
              </div>
            </div>
          )}

          {/* GIRLS UNIFORM CARD */}
          {girlsUniform && (
            <div className="bg-white border-2 border-[#163A2D] shadow-sm flex flex-col justify-between group">
              <div>
                {/* Header Area */}
                <div className="p-6 border-b border-[#D0E4DA] flex items-center justify-between bg-[#FAF8F5]">
                  <div>
                    <span className="text-[9px] font-mono uppercase bg-[#EAF2ED] text-[#163A2D] px-2.5 py-1 font-bold border border-[#163A2D]/20">
                      {activeSeason === 'summer' ? 'Option 02 • Summer Girl' : 'Option 04 • Winter Girl'}
                    </span>
                    <h3 className="font-sans text-xl font-black text-[#163A2D] mt-2">
                      {activeSeason === 'summer' ? 'Summer Dress (Girls)' : 'Winter Dress (Girls)'}
                    </h3>
                  </div>
                  <div className="w-10 h-10 bg-[#163A2D] text-[#FAD02C] flex items-center justify-center">
                    <Shirt className="w-5 h-5" />
                  </div>
                </div>

                {/* Presentation Image */}
                <div className="relative h-[440px] sm:h-[540px] bg-[#FAF8F5] overflow-hidden border-b border-[#D0E4DA]">
                  <img
                    src={girlsUniform.imageUrl}
                    alt="Girls Uniform Presentation Render"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-4 left-6 text-[#FAD02C] bg-[#163A2D] text-[9px] font-mono uppercase tracking-widest px-3 py-1 font-bold border border-[#FAD02C]/40">
                    {activeSeason === 'summer' ? 'Summer Uniform Specification' : 'Winter Uniform Specification'}
                  </span>
                </div>

                {/* Details Section */}
                <div className="p-6 sm:p-8 space-y-6">
                  <p className="text-[#4E7D68] text-xs sm:text-sm leading-relaxed font-sans">
                    {girlsUniform.description}
                  </p>

                  {/* Components Spec */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase tracking-widest font-mono text-[#163A2D] font-bold">
                      Specification Details
                    </h4>
                    <div className="space-y-2">
                      {girlsUniform.components.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 bg-[#FAF8F5] border border-[#D0E4DA] p-3">
                          <div className="mt-0.5 bg-[#163A2D] p-0.5 text-[#FAD02C] shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs text-[#163A2D] leading-relaxed font-sans font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#D0E4DA] flex items-center justify-between text-[9px] font-mono text-[#4E7D68] font-bold">
                <span>SPEC CODE: SHS-UNI-{activeSeason.toUpperCase()}-GIRL</span>
                <span className="text-[#163A2D]">Mandatory Attire</span>
              </div>
            </div>
          )}

        </div>

        {/* Procurement details */}
        <div className="mt-12 bg-white border-2 border-[#163A2D] p-6 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-[#4E7D68] font-sans shadow-sm">
          <Sparkles className="w-5 h-5 text-[#163A2D] shrink-0" />
          <span>
            Official pre-stitched school insignias and matching fabric items are distributed directly from the admin wing. Parents are advised to coordinate sizing measurements during admissions.
          </span>
        </div>

      </div>
    </section>
  );
}
