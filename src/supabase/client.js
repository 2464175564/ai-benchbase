import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

// 用户认证相关函数
export const getCurrentUser = () => {
  const user = localStorage.getItem('supabase_user')
  return user ? JSON.parse(user) : null
}

export const signIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth-callback`
    }
  })
  if (error) console.error('登录失败:', error)
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('退出失败:', error)
  } else {
    localStorage.removeItem('supabase_user')
    location.reload()
  }
}