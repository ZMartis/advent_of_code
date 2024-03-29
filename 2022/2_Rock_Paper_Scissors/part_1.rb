input =
  File
    .open('input.txt')
    .read
    .split("\n")
    .map { |interaction| interaction.split(' ') }

# --------------------
directory = {
  'A' => {
    'X' => 3 + 1,
    'Y' => 6 + 2,
    'Z' => 3,
  },
  'B' => {
    'X' => 1,
    'Y' => 3 + 2,
    'Z' => 6 + 3,
  },
  'C' => {
    'X' => 6 + 1,
    'Y' => 2,
    'Z' => 3 + 3,
  },
}

print input
        .map { |interaction| directory[interaction.first][interaction.last] }
        .sum
