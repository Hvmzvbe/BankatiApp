import React from 'react';

const Footer = () => {
  return (
      <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white mt-auto border-t border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-bold">Bankati</p>
              <p className="text-sm text-slate-400">Votre partenaire de confiance</p>
            </div>

            {/* <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-purple-400 transition">Contact</a>
            <a href="#" className="hover:text-purple-400 transition">Conditions d'utilisation</a>
            <a href="#" className="hover:text-purple-400 transition">Confidentialité</a>
          </div>*/}
          </div>

          <div className="border-t border-slate-700 mt-4 pt-4 text-center text-sm text-slate-400">
            <p>© 2025 Hamza Benaghmouch. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;