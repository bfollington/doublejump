Doublejump::App.helpers do

  def find_from_id_list(model, id_list, fields = nil)
    if fields.nil?
        model.find(id_list).sort_by{|m| id_list.index(m.id) }
    else
        model.only(fields).find(id_list).sort_by{|m| id_list.index(m.id) }
    end
  end

end
