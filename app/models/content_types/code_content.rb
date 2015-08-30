class CodeContent < Content

  field :body, :type => String, :overwrite => true
  field :language, :type => String, :overwrite => true

  validates_presence_of :body, :message => "You can't have an empty content block, that makes no sense."

  def to_hash
    {
      id: _id.to_s,
      body: body,
      language: language,
      type: _type
    }
  end

  def from_hash(data)
    update_attributes!({
      body: data["body"],
      language: data["language"]
    })
  end

end

