lines = File.read('input.txt').split("\n")

start_time = Time.now

@string_number_mapping = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

def number(line, cursor, iterator)
  loop do
    char = line[cursor]
    return char if (1..9).include?(char.to_i)

    unless %w[o t f s e n].include?(char)
      cursor += iterator
      next
    end

    if iterator == -1 && cursor > line.length - 3
      cursor += iterator
      next
    end

    @string_number_mapping.each do |key, value|
      string_key = key.to_s
      return value if line[cursor, string_key.length] == string_key.to_s
    end

    cursor += iterator
  end
end

numbers_for_lines =
  lines.map do |line|
    "#{number(line, 0, 1)}#{number(line, line.length - 1, -1)}".to_i
  end

end_time = Time.now

puts numbers_for_lines.sum
# => 54265

puts end_time - start_time
