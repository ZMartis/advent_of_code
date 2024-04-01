# "x,y": {
#   height: letter
#   distance: number | nil
#   is_starting_point: boolean
#   is_ending_point: boolean
# }
def point_mapping
  @_point_mapping ||=
    @elevations
      .map
      .with_index do |row, row_index|
        row.map.with_index do |column, column_index|
          height = nil
          is_starting_point = false
          is_ending_point = false

          if column == "S"
            height = "a"
            is_starting_point = true
          elsif column == "E"
            height = "z"
            is_ending_point = true
          else
            height = column
          end

          [
            "#{column_index},#{row_index}",
            {
              height:,
              distance: column == "S" ? 0 : nil,
              is_starting_point:,
              is_ending_point:
            }
          ]
        end
      end
      .flatten(1)
      .to_h
end

def add_shortest_distance_from_start_for_each_point_in_mapping(
  starting_point_location
)
  location_queue = [starting_point_location]

  while location_queue.count > 0
    current_point_location = location_queue.shift
    current_point_data = point_mapping[current_point_location]

    # find potential points to move to. (up, right, down, left)
    current_x, current_y = current_point_location.split(",")
    potential_next_point_locations = [
      "#{current_x},#{current_y.to_i - 1}",
      "#{current_x.to_i + 1},#{current_y}",
      "#{current_x},#{current_y.to_i + 1}",
      "#{current_x.to_i - 1},#{current_y}"
    ]

    # check each possible point and them to location_queue if they exist in point_mapping
    potential_next_point_locations.each do |potential_point_location|
      potential_point_data = point_mapping[potential_point_location]

      next unless potential_point_data

      if reachable_point?(current_point_data, potential_point_data)
        potential_point_data[:distance] = potential_point_distance(
          current_point_data
        )
        # because this potential point has been updated I need to check all of it's potential points so I add it to the queue
        # Adding to the end of the queue is breadth first, adding to the beginning is depth first
        # breadth first is much faster in this situation
        location_queue << "#{potential_point_location}"
      end
    end
  end
end

def reachable_point?(current_point_data, possible_point_data)
  possible_point_within_height_distance?(
    current_point_data[:height],
    possible_point_data[:height]
  ) &&
    (
      possible_point_data[:distance] == nil ||
        possible_point_data[:distance] >
          potential_point_distance(current_point_data)
    )
end

def possible_point_within_height_distance?(current_height, height_to_check)
  @height_order ||= [*("a".."z")]

  current_height_index = @height_order.find_index(current_height)
  check_height_index = @height_order.find_index(height_to_check)

  check_height_index - current_height_index <= 1
end

def potential_point_distance(current_point_data)
  current_point_data[:distance] + 1
end

# ------------------

start_time = Time.now

@elevations =
  File.open("input.txt").read.split("\n").map { |line| line.split("") }

starting_point_location =
  point_mapping.find { |_key, hash| hash[:is_starting_point] }.first
ending_point_location =
  point_mapping.find { |_key, hash| hash[:is_ending_point] }.first

add_shortest_distance_from_start_for_each_point_in_mapping(
  starting_point_location
)

shortest_distance_to_end = point_mapping[ending_point_location][:distance]

puts shortest_distance_to_end
# => 528

end_time = Time.now
puts end_time - start_time
# => 0.03
