class TopicRelevance
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  belongs_to :learning_module
  belongs_to :topic
  belongs_to :account
end
