input =
  File
    .open('input.txt')
    .read
    .split("\n")
    .map { |interaction| interaction.split(' ') }

# --------------------

directory = {
  'A' => {
    'X' => 3,
    'Y' => 1 + 3,
    'Z' => 2 + 6,
  },
  'B' => {
    'X' => 1,
    'Y' => 2 + 3,
    'Z' => 3 + 6,
  },
  'C' => {
    'X' => 2,
    'Y' => 3 + 3,
    'Z' => 1 + 6,
  },
}

print input
        .map { |interaction| directory[interaction.first][interaction.last] }
        .sum
