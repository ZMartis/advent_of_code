@input = File.open('input.txt').read.split("\n")

@register = 1

@display_lines = []

def split_line(line)
  line.split(' ')[1].to_i
end

def set_pixel(display_index)
  if [@register - 1, @register, @register + 1].include?(display_index)
    @display_lines.last << '#'
  else
    @display_lines.last << '.'
  end
end

def cathode_ray_tube
  input_index = 0
  add_cycle = 0
  for y in 0...6
    @display_lines << []
    for x in 0...40
      set_pixel(x)
      if @input[input_index] == 'noop'
        input_index += 1
        next
      end
      add_cycle += 1
      if add_cycle == 2
        @register += split_line(@input[input_index])
        add_cycle = 0
        input_index += 1
      end

      print @register, ' ', x, "\n"
    end
  end
end

cathode_ray_tube

@display_lines.each { |line| print line.join(''), "\n" }
