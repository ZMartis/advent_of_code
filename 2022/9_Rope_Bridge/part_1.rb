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

def rope(input)
  head_position = [0, 0]
  tail_position = [0, 0]

  positions = Set['0,0']

  input.each do |movement_obj|
    movement_obj[:number].times do |i|
      # move the head
      head_position = new_head_pos(head_position, movement_obj[:direction])

      # check if the tail is not touching

      if (head_position[0] - tail_position[0]).abs > 1
        if tail_position[0] < head_position[0]
          tail_position[0] = head_position[0] - 1
        else
          tail_position[0] = head_position[0] + 1
        end
        if tail_position[1] != head_position[1]
          tail_position[1] = head_position[1]
        end
      end

      if (head_position[1] - tail_position[1]).abs > 1
        if tail_position[1] < head_position[1]
          tail_position[1] = head_position[1] - 1
        else
          tail_position[1] = head_position[1] + 1
        end
        if tail_position[0] != head_position[0]
          tail_position[0] = head_position[0]
        end
      end

      # increment if tail is in a new position
      positions.add?("#{tail_position[0]},#{tail_position[1]}")
    end
  end
  positions.count
end

print rope(input)
