"use client"

import { Edit } from "lucide-react"

interface EditButtonProps {
      onClick?: () => void
}

const EditButton = ({ onClick }: EditButtonProps) => {
      return (
            <button
                  onClick={onClick}
                  className="absolute top-2 right-2 p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                  aria-label="Edit profile"
            >
                  <Edit size={14} className="text-white" />
            </button>
      )
}

export default EditButton;
