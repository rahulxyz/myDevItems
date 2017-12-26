(function(){
   'use strict';

   //starter
   describe('Jasmine Unit Test Framework', function(){
      it('should pass this test',function () {
          expect(0).toBe(0);
      })
   })

    describe("A suite is just a function", function() {
        var a;

        it("and so is a spec", function() {
            a = true;

            expect(a).toBe(true);
        });
    });

    //checks helloWorld function
    describe("HelloWorld",function () {
        it('should return helloWorld',function () {
            expect(getHelloWorld()).toEqual('Hello World');
        })
    })

    //checks if data is null
    describe("fetching Data", function(){
        it('should not be null', function (){
            expect(getData()).not.toEqual(null)
        })
    })

    //simple count change before each spec
    describe("A spec using beforeEach and afterEach", function() {
        var foo = 0;

        beforeEach(function() {
            foo += 1;
        });

        afterEach(function() {
            foo = 0;
        });

        it("should be equal to 1", function() {
            expect(foo).toEqual(1);
        });

        it("should also be equal to 1", function() {
            expect(foo).toEqual(1);
            expect(true).toEqual(true);
        });
    });

    //simple count change only once before and after all specs are run
    describe("A spec using beforeAll and afterAll", function() {
        var foo;

        beforeAll(function() {
            foo = 1;
        });

        afterAll(function() {
            foo = 0;
        });

        it("sets the initial value of foo before specs run", function() {
            expect(foo).toEqual(1);
            foo += 1;
        });

        it("does not reset foo between specs", function() {
            expect(foo).toEqual(2);
        });
    });

    //Pending Specs. Any Spec with xit or pending() is marked as pending
    describe("Pending specs", function() {
        xit("can be declared 'xit'", function() {
            expect(true).toBe(false);
        });

        it("can be declared with 'it' but without a function");

        it("can be declared by calling 'pending' in the spec body", function() {
            expect(true).toBe(false);
            pending();
        });
    });

    //Spies can be set on functions to know when it is called
    describe("A spy", function() {
        var foo, bar = null;

        beforeEach(function() {
            foo = {
                setBar: function(value) {
                    bar = value;
                }
            };

            spyOn(foo, 'setBar');

            foo.setBar(123);
            foo.setBar(456, 'another param');
        });

        it("tracks that the spy was called", function() {
            expect(foo.setBar).toHaveBeenCalled();
        });

        it("tracks all the arguments of its calls", function() {
            expect(foo.setBar).toHaveBeenCalledWith(123);
            expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
        });

        it("stops all execution on a function", function() {
            expect(bar).toBeNull();
        });
    });

    //Matching anything with jasmine.any
    describe("jasmine.any", function() {
        it("matches any value", function() {
            expect({}).toEqual(jasmine.any(Object));
            expect(12).toEqual(jasmine.any(Number));
        });

        describe("when used with a spy", function() {
            it("is useful for comparing arguments", function() {
                var foo = jasmine.createSpy('foo');
                foo(12, function() {
                    return true;
                });

                expect(foo).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Function));
            });
        });
    });

    //Partial Matching for expecting only certain key-value pairs
    describe("jasmine.objectContaining", function() {
        var foo;

        beforeEach(function () {
            foo = {
                a: 1,
                b: 2,
                bar: "baz"
            };
        });

        it("matches objects with the expect key/value pairs", function () {
            expect(foo).toEqual(jasmine.objectContaining({
                bar: "baz"
            }));
            expect(foo).not.toEqual(jasmine.objectContaining({
                c: 37
            }));
        });
    });

}());