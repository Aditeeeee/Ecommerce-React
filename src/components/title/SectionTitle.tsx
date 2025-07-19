import { Box, Divider, Typography } from "@mui/material";

interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        my: 4,
      }}
    >
      <Divider sx={{ flex: 1, borderColor: "grey.400" }} />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          letterSpacing: 1,
          color: "text.primary",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ flex: 1, borderColor: "grey.400" }} />
    </Box>
  );
};

export default SectionTitle;
