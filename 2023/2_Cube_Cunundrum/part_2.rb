lines = File.read('input.txt').split("\n")

# 12r 13g 14b

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

games =
  game_mappings.map do |game_number, sets|
    game_max_cubes = { red: 0, blue: 0, green: 0 }

    sets.each do |set_index, set|
      set.each do |color, value|
        game_max_cubes[color] = value if value > game_max_cubes[color]
      end
    end

    game_power = game_max_cubes.values.reduce(:*)
  end

puts games.sum
