start_time = Time.now

@input = File.open("input.txt").read.split("\n").map { |line| line.split("") }

@height_order = [*("a".."z")]

starting_points = []
ending_point = nil

# "x,y": {
#   height: letter
#   distance: number | nil
# }
point_mapping = {}
@input.each_with_index do |row, row_index|
  row.each_with_index do |column, column_index|
    height = nil
    distance = nil

    if column == "S"
      starting_points << "#{column_index},#{row_index}"
      height = "a"
      distance = 0
    elsif column == "E"
      ending_point = "#{column_index},#{row_index}"
      height = "z"
    elsif column == "a"
      starting_points << "#{column_index},#{row_index}"
      height = "a"
      distance = 0
    else
      height = column
    end

    point_mapping["#{column_index},#{row_index}"] = {
      height: height,
      distance: distance
    }
  end
end

def possible_point_within_height_distance?(current_height, height_to_check)
  current_height_index = @height_order.find_index(current_height)
  check_height_index = @height_order.find_index(height_to_check)

  check_height_index - current_height_index <= 1
end

def reachable_point?(current_point_data, possible_point_data)
  possible_point_within_height_distance?(
    current_point_data[:height],
    possible_point_data[:height]
  ) &&
    (
      possible_point_data[:distance] == nil ||
        possible_point_data[:distance] > current_point_data[:distance] + 1
    )
end

distances_from_starting_points = []

starting_points.each do |starting_point|
  location_queue = [starting_point]

  while location_queue.count > 0
    current_point_check = location_queue.shift
    current_x, current_y = current_point_check.split(",")

    current_point_data = point_mapping[current_point_check]

    # find available moves
    possible_points = [
      "#{current_x},#{current_y.to_i - 1}",
      "#{current_x.to_i + 1},#{current_y}",
      "#{current_x},#{current_y.to_i + 1}",
      "#{current_x.to_i - 1},#{current_y}"
    ]

    # check each possible point and them to location_queue if they exist in point_mapping
    possible_points.each do |possible_point|
      possible_point_data = point_mapping[possible_point]

      next unless possible_point_data

      if reachable_point?(current_point_data, possible_point_data)
        possible_point_data[:distance] = current_point_data[:distance] + 1
        location_queue << "#{possible_point}"
      end
    end
  end

  distances_from_starting_points << point_mapping[ending_point][:distance]
end

puts distances_from_starting_points.min
# => 522

end_time = Time.now

puts end_time - start_time
# => 0.15
