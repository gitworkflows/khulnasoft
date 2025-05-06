import { khulnasoft } from '@khulnasoft.com/sdk'
import { useEffect, useState } from 'react'

export function khulnasoftEditing() {
  const [khulnasoftEditing, setKhulnasoftEditing] = useState<string | null>(null)

  useEffect(() => {
    if (khulnasoft.editingModel) {
      setKhulnasoftEditing(khulnasoft.editingModel)
    }
  }, [])

  return khulnasoftEditing
}
