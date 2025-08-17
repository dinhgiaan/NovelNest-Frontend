"use client"

import { Switch } from "@mui/material"
import { useState } from "react"

interface SettingSwitchProps {
      defaultChecked?: boolean
      size?: "small" | "medium"
      onChange?: (checked: boolean) => void
}

const SettingSwitch = ({ defaultChecked = false, size = "medium", onChange }: SettingSwitchProps) => {
      const [checked, setChecked] = useState(defaultChecked)

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newChecked = event.target.checked
            setChecked(newChecked)
            onChange?.(newChecked)
      }

      return (
            <Switch
                  checked={checked}
                  onChange={handleChange}
                  size={size}
                  sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#3b82f6",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                              backgroundColor: "#3b82f6",
                        },
                  }}
            />
      )
}

export default SettingSwitch;
