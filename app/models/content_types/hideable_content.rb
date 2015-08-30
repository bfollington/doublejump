class HideableContent < Content

  field :title, :type => String, :overwrite => true

  validates_presence_of :title

  def to_hash
    {
      id: _id.to_s,
      title: title,
      type: _type
    }
  end

  def from_hash(data)
    update_attributes!({
      title: data["title"]
    })
  end

end

