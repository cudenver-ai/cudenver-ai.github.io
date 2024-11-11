import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import StarIcon from "@mui/icons-material/Star";
import GradeIcon from "@mui/icons-material/Grade";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([
    {
      rank: 1,
      team: "W's Only",
      score: 0.8202,
    },
    {
      rank: 2,
      team: "NSBE",
      score: 0.82,
    },
    {
      rank: 3,
      team: "Nika",
      score: 0.8183,
    },
    {
      rank: 4,
      team: "AI Posers",
      score: 0.8159,
    },
    {
      rank: 5,
      team: "Hung Nguyen",
      score: 0.8141,
    },
    {
      rank: 6,
      team: "Mighty Milo Hackers",
      score: 0.8095,
    },
    {
      rank: 7,
      team: "Noise Classifier",
      score: 0.8088,
    },
    {
      rank: 8,
      team: "Vojjina",
      score: 0.8086,
    },
    {
      rank: 9,
      team: "Denver Continental",
      score: 0.8038,
    },
    {
      rank: 10,
      team: "Ranas Team",
      score: 0.8028,
    },
  ]);

  const getRankIcon = (rank) => {
    if (rank === 1) {
      return <EmojiEventsIcon sx={{ color: "gold" }} />;
    } else if (rank === 2) {
      return <MilitaryTechIcon sx={{ color: "silver" }} />;
    } else if (rank === 3) {
      return <MilitaryTechIcon sx={{ color: "bronze" }} />;
    } else if (rank === 4) {
      return <StarIcon sx={{ color: "purple" }} />;
    } else if (rank === 5) {
      return <GradeIcon sx={{ color: "blue" }} />;
    } else if (rank === 6) {
      return <GradeIcon sx={{ color: "blue" }} />;
    } else if (rank === 7) {
      return <GradeIcon sx={{ color: "blue" }} />;
    } else if (rank === 8) {
      return <GradeIcon sx={{ color: "blue" }} />;
    } else if (rank === 9) {
      return <GradeIcon sx={{ color: "blue" }} />;
    } else if (rank === 10) {
      return <GradeIcon sx={{ color: "blue" }} />;
    }
    return null;
  };

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle" gutterBottom>
          Top 10
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Team</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.map((row) => (
                <TableRow key={row.rank}>
                  <TableCell component="th" scope="row">
                    {getRankIcon(row.rank)} {row.rank}
                  </TableCell>
                  <TableCell>{row.team}</TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
