module ModelHelpers

    module_function

    def flatten_id_array(ids)
        ret = []

        ids.each do |id|
            ret << id.to_s
        end

        ret
    end

end
