class ModuleDifficulty
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  field :difficulty, :type => Integer

  belongs_to :learning_module
  belongs_to :account
end
