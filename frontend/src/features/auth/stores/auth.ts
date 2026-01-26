import { defineStore } from 'pinia'
import { supabase } from '@/services/supabase'
import type { User, Session } from '@supabase/supabase-js'
import type { AuthUser, AuthSession } from '../types'

export const useAuthStore = defineStore('auth', {
  // 1. STATE: The data we want to keep track of
  state: () => ({
    user: null as AuthUser | null,
    session: null as AuthSession | null,
    loading: true // Start true so we don't show the login screen while checking
  }),

  // 2. GETTERS: Computed values (like "Is the user logged in?")
  getters: {
    isAuthenticated: (state) => !!state.user
  },

  // 3. ACTIONS: Methods to modify state (Sign In, Sign Out)
  actions: {
    // Call this in App.vue to check if user is already logged in
    async initialize() {
      try {
        this.loading = true
        
        // Get current session
        // We use getSession() instead of getUser() here to reduce the number of API calls.
        //    getSession() checks the browser memory for a saved token which 'looks' valid (and can also auto refresh tokens)
        //    getUser() validates the token with the server
        // Since initialize() is called on every reload, getSession() is sufficient and preferred for speed.
        const { data } = await supabase.auth.getSession()
        this.session = data.session
        this.user = data.session?.user || null

        // Listen for changes (e.g. if token expires or user logs out in another tab)
        supabase.auth.onAuthStateChange((_event, session) => {
          this.session = session
          this.user = session?.user || null
        })
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        this.loading = false
      }
    },

    async signIn(email: string, pass: string) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: pass
      })
      if (error) throw error
    },

    async signUp(email: string, pass: string) {
      const { error } = await supabase.auth.signUp({
        email,
        password: pass
      })
      if (error) throw error
    },

    async signOut() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      // State updates automatically via the onAuthStateChange listener above
    },

    async resetPassword(email: string) {
      // The redirectTo points to where the user goes after clicking the email link.
      // Usually, this logs them in automatically, allowing them to change their password on the Dashboard or a Profile page.
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/dashboard`
      })
      if (error) throw error
    }
  }
})