import { Box, useTheme } from "@mui/material";
import { color } from "@mui/system";
import { tokens } from '../theme';

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const angle = progress * 360

  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[800]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.pink[500]} ${angle}deg 360deg),
            ${colors.turquoise[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  )
}

export default ProgressCircle