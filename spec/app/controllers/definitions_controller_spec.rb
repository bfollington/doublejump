require 'spec_helper'

describe "DefinitionsController" do
  before do
    get "/"
  end

  it "returns hello world" do
    last_response.should be_ok
  end
end
