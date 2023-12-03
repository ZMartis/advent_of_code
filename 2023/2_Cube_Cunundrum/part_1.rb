lines = File.read('input.txt').split("\n")

@numbers_to_compare = { red: 12, green: 13, blue: 14 }

game_mappings = {}

lines.each do |line|
  game_number_split = line.split(':')

  game_number = game_number_split[0].split(' ').last

  sets_hash = {}
  sets = game_number_split[1].split('; ')
  sets.map.with_index do |set, index|
    sets_hash[index] = { red: 0, blue: 0, green: 0 }
    set
      .split(', ')
      .map do |die|
        split_die = die.split(' ')
        sets_hash[index][split_die[1].to_sym] = split_die[0].to_i
      end
  end

  game_mappings[game_number] = sets_hash
end

def possible_set?(set)
  set[:red] <= @numbers_to_compare[:red] &&
    set[:green] <= @numbers_to_compare[:green] &&
    set[:blue] <= @numbers_to_compare[:blue]
end

def possible_game?(game)
  game.all? { |key, value| possible_set?(value) }
end

possible_games =
  game_mappings.select { |game_number, sets| possible_game?(sets) }

puts possible_games.keys.map(&:to_i).sum
