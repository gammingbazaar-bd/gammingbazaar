'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDownload } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

export default function FloatingAppInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstall, setShowInstall] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Register the service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(
          function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          },
          function(err) {
            console.log('ServiceWorker registration failed: ', err);
          }
        );
      });
    }

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsDismissed(true)
    }

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      
      // We only show the prompt if it hasn't been explicitly dismissed
      const dismissed = localStorage.getItem('pwa_install_dismissed')
      if (!dismissed) {
        setShowInstall(true)
      }
    });

    // Detect when the app is successfully installed
    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null)
      setShowInstall(false)
      setIsDismissed(true)
    })
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setShowInstall(false)
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowInstall(false)
    setIsDismissed(true)
    localStorage.setItem('pwa_install_dismissed', 'true')
  }

  // If there's no deferred prompt (either not supported, already installed, or not fired yet) 
  // or it was dismissed, we hide the button
  if (!showInstall && !isDismissed && deferredPrompt) {
     // fallback if showInstall got toggled
     setShowInstall(true)
  }

  return (
    <AnimatePresence>
      {(showInstall || deferredPrompt) && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.95 }}
          transition={{ type: 'spring', damping: 22, stiffness: 180 }}
          className="fixed bottom-20 left-2 right-2 z-[9999] md:left-auto md:right-6 md:w-[380px]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1224] shadow-2xl backdrop-blur-xl">

            {/* glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full"></div>

            <div className="relative flex items-center justify-between p-4">

              {/* left */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <FaDownload className="text-white text-sm" />
                </div>

                <div>
                  <p className="text-white font-semibold text-sm">
                    Install App
                  </p>
                  <p className="text-gray-400 text-xs">
                    Try Our Mobile App
                  </p>
                </div>
              </div>

              {/* right buttons */}
              <div className="flex items-center gap-2">

                <button
                  onClick={handleInstallClick}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold shadow-lg hover:opacity-90 active:scale-95 transition"
                >
                  Install
                </button>

                <button
                  onClick={handleDismiss}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition flex items-center justify-center"
                >
                  <IoClose size={18} />
                </button>

              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}