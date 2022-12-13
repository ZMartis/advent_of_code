class MyMap
  def initialize
    @array = Array.new(10_000, nil)
  end

  def turn_string_to_mostly_unique_int(key)
    key[0].ord * 100 + key[1].ord
  end

  def set(key, value)
    hash_number = turn_string_to_mostly_unique_int(key)

    if @array[hash_number] != nil
      @array[hash_number] << [key, value]
    else
      @array[hash_number] = [[key, value]]
    end
  end

  def find_the_value(key)
    hash_number = turn_string_to_mostly_unique_int(key)

    if @array[hash_number] != nil
      for index in @array[hash_number]
        return index[1] if index[0] == key
      end
    end
    'Not Found'
  end
end

this_map = MyMap.new

this_map.set('something', 69)
print this_map.find_the_value('something')
