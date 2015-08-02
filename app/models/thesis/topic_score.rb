class TopicScore
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  field :score, :type => Integer

  belongs_to :project
  belongs_to :topic
end
