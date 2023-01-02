require 'set'

input =
  File
    .open('input.txt')
    .read
    .split("\n")
    .map do |row|
      split_row = row.split(' ')
      { direction: split_row[0], number: split_row[1].to_i }
    end

def new_head_pos(current_pos, direction)
  case direction
  when 'U'
    [current_pos[0], current_pos[1] - 1]
  when 'D'
    [current_pos[0], current_pos[1] + 1]
  when 'L'
    [current_pos[0] - 1, current_pos[1]]
  when 'R'
    [current_pos[0] + 1, current_pos[1]]
  end
end

def knot_interaction(head_position, tail_position)
  # check if the tail is not touching

  if (head_position[0] - tail_position[0]).abs > 1
    if tail_position[0] < head_position[0]
      tail_position[0] = head_position[0] - 1
    else
      tail_position[0] = head_position[0] + 1
    end
    if tail_position[1] < head_position[1]
      tail_position[1] += 1
    elsif tail_position[1] > head_position[1]
      tail_position[1] -= 1
    end
  end

  if (head_position[1] - tail_position[1]).abs > 1
    if tail_position[1] < head_position[1]
      tail_position[1] = head_position[1] - 1
    else
      tail_position[1] = head_position[1] + 1
    end

    if tail_position[0] < head_position[0]
      tail_position[0] += 1
    elsif tail_position[0] > head_position[0]
      tail_position[0] -= 1
    end
  end

  tail_position
end

def rope_movement(input)
  knot_positions = []
  10.times { knot_positions << [0, 0] }

  positions = Set[]

  input.each do |movement_obj|
    movement_obj[:number].times do |i|
      knot_positions.each_with_index do |knot, knot_index|
        if knot_index == 0
          knot_positions[0] = new_head_pos(knot, movement_obj[:direction])
        else
          previous_knot = knot_positions[knot_index - 1]
          knot_positions[knot_index] = knot_interaction(previous_knot, knot)
        end
        positions.add?("#{knot_positions[9][0]},#{knot_positions[9][1]}")
      end
    end
  end

  positions.count
end

print rope_movement(input)
